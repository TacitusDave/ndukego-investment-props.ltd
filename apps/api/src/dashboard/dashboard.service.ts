import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [
      propertiesByStatus,
      totalEstates,
      estatesByStatus,
      totalCustomers,
      customersByStatus,
      recentProperties,
      recentActivity,
      totalReservations,
      reservationsByStatus,
      totalSales,
      salesByStatus,
      inquiryCounts,
    ] = await Promise.all([
      this.prisma.property.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.estate.count({ where: { deletedAt: null } }),
      this.prisma.estate.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.customer.count({ where: { deletedAt: null } }),
      this.prisma.customer.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.property.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          id: true,
          internalNumber: true,
          title: true,
          status: true,
          listingPrice: true,
          state: true,
          city: true,
          createdAt: true,
          estate: { select: { name: true } },
        },
      }),
      this.prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: {
          id: true,
          actorEmail: true,
          action: true,
          entityType: true,
          entityLabel: true,
          createdAt: true,
        },
      }),
      this.prisma.reservation.count({ where: { deletedAt: null } }),
      this.prisma.reservation.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.sale.count({ where: { deletedAt: null } }),
      this.prisma.sale.groupBy({
        by: ['status'],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.$queryRawUnsafe<{ total: string; newCount: string }[]>(
        `SELECT COUNT(*)::text AS total,
                SUM(CASE WHEN status = 'NEW' THEN 1 ELSE 0 END)::text AS "newCount"
         FROM inquiries`,
      ),
    ]);

    const propertyStatusMap = Object.fromEntries(
      propertiesByStatus.map((r) => [r.status, r._count.id]),
    );

    const estateStatusMap = Object.fromEntries(
      estatesByStatus.map((r) => [r.status, r._count.id]),
    );

    const customerStatusMap = Object.fromEntries(
      customersByStatus.map((r) => [r.status, r._count.id]),
    );

    const reservationStatusMap = Object.fromEntries(
      reservationsByStatus.map((r) => [r.status, r._count.id]),
    );

    const salesStatusMap = Object.fromEntries(
      salesByStatus.map((r) => [r.status, r._count.id]),
    );

    const totalProperties = propertiesByStatus.reduce((s, r) => s + r._count.id, 0);
    const iq = inquiryCounts[0] ?? { total: '0', newCount: '0' };

    return {
      properties: {
        total: totalProperties,
        byStatus: propertyStatusMap,
      },
      estates: {
        total: totalEstates,
        byStatus: estateStatusMap,
      },
      customers: {
        total: totalCustomers,
        byStatus: customerStatusMap,
      },
      reservations: {
        total: totalReservations,
        byStatus: reservationStatusMap,
      },
      sales: {
        total: totalSales,
        byStatus: salesStatusMap,
      },
      inquiries: {
        total: parseInt(iq.total, 10),
        newCount: parseInt(iq.newCount, 10),
      },
      recentProperties,
      recentActivity,
    };
  }
}
