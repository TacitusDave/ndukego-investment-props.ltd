import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { calculatePagination, slugify, generateReference } from '@nhgp/lib';
import { AuthenticatedUser } from '@nhgp/types';
import { Prisma } from '@nhgp/database';

@Injectable()
export class EstateService {
  constructor(private readonly prisma: PrismaService, private readonly auditService: AuditService) {}

  async create(data: Record<string, unknown>, user: AuthenticatedUser) {
    const slug = slugify(String(data.name)) + '-' + Date.now().toString(36);
    const estate = await this.prisma.estate.create({
      data: {
        companyId: data.companyId as string,
        name: data.name as string,
        code: data.code as string,
        slug,
        description: data.description as string | undefined,
        shortDescription: data.shortDescription as string | undefined,
        state: data.state as string,
        lga: data.lga as string | undefined,
        city: data.city as string | undefined,
        district: data.district as string | undefined,
        community: data.community as string | undefined,
        address: data.address as string | undefined,
        latitude: data.latitude as number | undefined,
        longitude: data.longitude as number | undefined,
        totalLandSize: data.totalLandSize as number | undefined,
        totalPlots: data.totalPlots as number | undefined,
        availablePlots: data.totalPlots as number | undefined,
        createdById: user.employeeId ?? user.id,
      },
    });
    await this.auditService.log({ actorId: user.id, actorEmail: user.email, action: 'CREATE', entityType: 'ESTATE', entityId: estate.id, entityLabel: estate.name });
    return estate;
  }

  async findAll(query: { page?: number; limit?: number; search?: string; status?: string; companyId?: string }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { skip } = calculatePagination(page, limit, 0);
    const where: Prisma.EstateWhereInput = {
      deletedAt: null,
      ...(query.status && { status: query.status as never }),
      ...(query.companyId && { companyId: query.companyId }),
      ...(query.search && { OR: [{ name: { contains: query.search, mode: 'insensitive' } }, { city: { contains: query.search, mode: 'insensitive' } }] }),
    };
    const [items, total] = await Promise.all([
      this.prisma.estate.findMany({ where, skip, take: limit, include: { phases: true, blocks: true, _count: { select: { properties: true } } } }),
      this.prisma.estate.count({ where }),
    ]);
    return { items, meta: calculatePagination(page, limit, total) };
  }

  async findOne(id: string) {
    const estate = await this.prisma.estate.findFirst({
      where: { id, deletedAt: null },
      include: { phases: true, blocks: true, infrastructure: true, properties: { where: { deletedAt: null }, take: 20 } },
    });
    if (!estate) throw new NotFoundException('Estate not found');
    return estate;
  }

  async update(id: string, data: Prisma.EstateUpdateInput, user: AuthenticatedUser) {
    await this.findOne(id);
    const estate = await this.prisma.estate.update({ where: { id }, data: { ...data, updatedById: user.employeeId ?? user.id } });
    await this.auditService.log({ actorId: user.id, actorEmail: user.email, action: 'UPDATE', entityType: 'ESTATE', entityId: id, entityLabel: estate.name });
    return estate;
  }

  async addPhase(estateId: string, data: { name: string; code: string; description?: string; totalPlots?: number }, user: AuthenticatedUser) {
    await this.findOne(estateId);
    return this.prisma.estatePhase.create({ data: { estateId, ...data } });
  }

  async addBlock(estateId: string, data: { name: string; code: string; section?: string; totalPlots?: number }, user: AuthenticatedUser) {
    await this.findOne(estateId);
    return this.prisma.estateBlock.create({ data: { estateId, ...data } });
  }

  async addInfrastructure(estateId: string, data: { name: string; type: string; description?: string }, user: AuthenticatedUser) {
    await this.findOne(estateId);
    return this.prisma.estateInfrastructure.create({ data: { estateId, ...data } });
  }
}
