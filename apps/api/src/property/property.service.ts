import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { generateReference, slugify, isValidPropertyStatusTransition, calculatePagination } from '@nhgp/lib';
import { PropertyStatus, Prisma } from '@nhgp/database';
import { AuthenticatedUser } from '@nhgp/types';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(data: Prisma.PropertyCreateInput & { estateId?: string; developmentId?: string }, user: AuthenticatedUser) {
    if (!data.estateId && !data.developmentId) {
      throw new BadRequestException('Property must belong to an Estate or Development (Rule 5)');
    }

    const count = await this.prisma.property.count();
    const internalNumber = generateReference('PROP');
    const slug = slugify(data.title) + '-' + Date.now().toString(36);

    const property = await this.prisma.property.create({
      data: {
        internalNumber,
        slug,
        title: data.title,
        category: data.category as never,
        type: data.type as never,
        state: data.state,
        lga: data.lga,
        city: data.city,
        description: data.description,
        shortDescription: data.shortDescription,
        listingPrice: data.listingPrice,
        landSize: data.landSize,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        installmentAllowed: data.installmentAllowed ?? false,
        reservationAmount: data.reservationAmount,
        estate: data.estateId ? { connect: { id: data.estateId } } : undefined,
        development: data.developmentId ? { connect: { id: data.developmentId } } : undefined,
        createdById: user.employeeId ?? user.id,
        statusHistory: {
          create: { toStatus: 'DRAFT', changedById: user.employeeId ?? user.id, reason: 'Property created' },
        },
      },
      include: { estate: true, development: true },
    });

    await this.auditService.log({
      actorId: user.id,
      actorEmail: user.email,
      action: 'CREATE',
      entityType: 'PROPERTY',
      entityId: property.id,
      entityLabel: property.title,
      newValues: { internalNumber, title: property.title, status: 'DRAFT' },
    });

    return property;
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    search?: string;
    status?: PropertyStatus;
    category?: string;
    type?: string;
    estateId?: string;
    featured?: boolean;
    publicOnly?: boolean;
  }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { skip } = calculatePagination(page, limit, 0);

    const where: Prisma.PropertyWhereInput = {
      deletedAt: null,
      ...(query.publicOnly && { status: 'PUBLISHED' }),
      ...(query.status && { status: query.status }),
      ...(query.category && { category: query.category as never }),
      ...(query.type && { type: query.type as never }),
      ...(query.estateId && { estateId: query.estateId }),
      ...(query.featured !== undefined && { featured: query.featured }),
      ...(query.search && {
        OR: [
          { title: { contains: query.search, mode: 'insensitive' } },
          { internalNumber: { contains: query.search, mode: 'insensitive' } },
          { city: { contains: query.search, mode: 'insensitive' } },
          { state: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
    };

    const [items, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        include: {
          estate: { select: { id: true, name: true, slug: true } },
          development: { select: { id: true, name: true, slug: true } },
          media: { where: { isCover: true }, take: 1 },
        },
      }),
      this.prisma.property.count({ where }),
    ]);

    return { items, meta: calculatePagination(page, limit, total) };
  }

  async findOne(id: string, incrementView = false) {
    const property = await this.prisma.property.findFirst({
      where: { id, deletedAt: null },
      include: {
        estate: true,
        development: true,
        building: true,
        manager: { select: { id: true, firstName: true, lastName: true, email: true } },
        media: { orderBy: { sortOrder: 'asc' } },
        statusHistory: { orderBy: { createdAt: 'desc' }, take: 10 },
        inspections: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });

    if (!property) throw new NotFoundException('Property not found');

    if (incrementView && property.status === 'PUBLISHED') {
      await this.prisma.property.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return property;
  }

  async update(id: string, data: Partial<Prisma.PropertyUpdateInput>, user: AuthenticatedUser) {
    const existing = await this.findOne(id);

    if (existing.status === 'SOLD') {
      throw new ForbiddenException('Sold properties cannot be modified (Rule 2)');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { ...data, updatedById: user.employeeId ?? user.id } as Prisma.PropertyUpdateInput,
    });

    await this.auditService.log({
      actorId: user.id,
      actorEmail: user.email,
      action: 'UPDATE',
      entityType: 'PROPERTY',
      entityId: id,
      entityLabel: property.title,
      oldValues: { title: existing.title, status: existing.status },
      newValues: data as Record<string, unknown>,
    });

    return property;
  }

  async transitionStatus(id: string, toStatus: PropertyStatus, reason: string | undefined, user: AuthenticatedUser) {
    const property = await this.findOne(id);

    if (property.status === 'SOLD' && toStatus !== 'ARCHIVED') {
      throw new ForbiddenException('Sold property cannot return to available status (Rule 2)');
    }

    if (!isValidPropertyStatusTransition(property.status, toStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${property.status} to ${toStatus}`,
      );
    }

    if (toStatus === 'PUBLISHED') {
      await this.validatePublishRequirements(id);
    }

    if (toStatus === 'ARCHIVED' && !user.permissions.includes('property.archive')) {
      throw new ForbiddenException('Only management can archive properties (Rule 3)');
    }

    if (toStatus === 'APPROVED' && !user.permissions.includes('property.approve')) {
      throw new ForbiddenException('Only verified employees may approve listings (Rule 4)');
    }

    const updateData: Prisma.PropertyUpdateInput = {
      status: toStatus,
      updatedById: user.employeeId ?? user.id,
      statusHistory: {
        create: {
          fromStatus: property.status,
          toStatus,
          reason,
          changedById: user.employeeId ?? user.id,
        },
      },
    };

    if (toStatus === 'PUBLISHED') {
      updateData.publishedAt = new Date();
      updateData.publishedById = user.employeeId ?? user.id;
    }
    if (toStatus === 'ARCHIVED') {
      updateData.archivedAt = new Date();
    }
    if (toStatus === 'APPROVED') {
      updateData.approvedById = user.employeeId ?? user.id;
    }

    const updated = await this.prisma.property.update({
      where: { id },
      data: updateData,
    });

    await this.auditService.log({
      actorId: user.id,
      actorEmail: user.email,
      action: 'STATUS_CHANGE',
      entityType: 'PROPERTY',
      entityId: id,
      entityLabel: property.title,
      oldValues: { status: property.status },
      newValues: { status: toStatus, reason },
    });

    return updated;
  }

  private async validatePublishRequirements(propertyId: string) {
    const [inspections, documents, media] = await Promise.all([
      this.prisma.inspection.count({
        where: { propertyId, status: 'COMPLETED' },
      }),
      this.prisma.document.count({
        where: {
          entityType: 'PROPERTY',
          entityId: propertyId,
          status: { in: ['VERIFIED', 'APPROVED'] },
          deletedAt: null,
        },
      }),
      this.prisma.propertyMedia.count({ where: { propertyId } }),
    ]);

    const errors: string[] = [];
    if (inspections < 1) errors.push('At least one completed inspection required (Rule 6)');
    if (documents < 1) errors.push('Required legal documents must be uploaded and verified');
    if (media < 1) errors.push('Required photographs must be uploaded');

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Property cannot be published (Rule 1)',
        requirements: errors,
      });
    }
  }

  async softDelete(id: string, user: AuthenticatedUser) {
    const property = await this.findOne(id);
    await this.prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await this.auditService.log({
      actorId: user.id,
      actorEmail: user.email,
      action: 'DELETE',
      entityType: 'PROPERTY',
      entityId: id,
      entityLabel: property.title,
    });

    return { success: true };
  }
}
