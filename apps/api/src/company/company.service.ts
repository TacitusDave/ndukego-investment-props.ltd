import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { calculatePagination } from '@nhgp/lib';
import { AuthenticatedUser } from '@nhgp/types';
import { Prisma } from '@nhgp/database';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(data: Prisma.CompanyCreateInput, user: AuthenticatedUser) {
    const company = await this.prisma.company.create({ data });
    await this.auditService.log({
      actorId: user.id, actorEmail: user.email, action: 'CREATE',
      entityType: 'COMPANY', entityId: company.id, entityLabel: company.name,
    });
    return company;
  }

  async findAll(page = 1, limit = 20) {
    const { skip } = calculatePagination(page, limit, 0);
    const where = { deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.company.findMany({ where, skip, take: limit, include: { branches: true } }),
      this.prisma.company.count({ where }),
    ]);
    return { items, meta: calculatePagination(page, limit, total) };
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findFirst({
      where: { id, deletedAt: null },
      include: { branches: true, employees: { take: 10 } },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, data: Prisma.CompanyUpdateInput, user: AuthenticatedUser) {
    await this.findOne(id);
    const company = await this.prisma.company.update({ where: { id }, data });
    await this.auditService.log({
      actorId: user.id, actorEmail: user.email, action: 'UPDATE',
      entityType: 'COMPANY', entityId: id, entityLabel: company.name,
    });
    return company;
  }

  async createBranch(companyId: string, data: Prisma.CompanyBranchCreateInput, user: AuthenticatedUser) {
    await this.findOne(companyId);
    const branch = await this.prisma.companyBranch.create({
      data: { ...data, company: { connect: { id: companyId } } },
    });
    await this.auditService.log({
      actorId: user.id, actorEmail: user.email, action: 'CREATE',
      entityType: 'COMPANY', entityId: branch.id, entityLabel: branch.name,
    });
    return branch;
  }
}
