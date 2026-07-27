import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { JwtPayload } from '@nhgp/types';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
  ) {}

  async login(email: string, password: string, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        employee: {
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    permissions: { include: { permission: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || user.deletedAt) {
      await this.auditService.log({
        actorEmail: email,
        action: 'LOGIN_FAILED',
        ipAddress,
        userAgent,
        metadata: { reason: 'user_not_found' },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account temporarily locked. Try again later.');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      const failedCount = user.failedLoginCount + 1;
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginCount: failedCount,
          lockedUntil:
            failedCount >= MAX_FAILED_ATTEMPTS
              ? new Date(Date.now() + LOCK_DURATION_MS)
              : null,
        },
      });
      await this.auditService.log({
        actorId: user.id,
        actorEmail: email,
        action: 'LOGIN_FAILED',
        ipAddress,
        userAgent,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const permissions = this.extractPermissions(user);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
        lastLoginIp: ipAddress,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.type, permissions, {
      employeeId: user.employeeId ?? undefined,
      customerId: user.customerId ?? undefined,
    }, ipAddress, userAgent);

    await this.auditService.log({
      actorId: user.id,
      actorEmail: user.email,
      action: 'LOGIN',
      ipAddress,
      userAgent,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        type: user.type,
        employeeId: user.employeeId,
        customerId: user.customerId,
        permissions,
      },
      ...tokens,
    };
  }

  async refresh(refreshToken: string, ipAddress?: string, userAgent?: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = stored.user;
    if (user.status !== 'ACTIVE' || user.deletedAt) {
      throw new UnauthorizedException('User inactive');
    }

    const permissions = await this.getPermissionsForUser(user.id, user.employeeId);

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.generateTokens(
      user.id,
      user.email,
      user.type,
      permissions,
      { employeeId: user.employeeId ?? undefined, customerId: user.customerId ?? undefined },
      ipAddress,
      userAgent,
    );
  }

  async logout(userId: string, refreshToken?: string, ipAddress?: string) {
    if (refreshToken) {
      await this.prisma.refreshToken.updateMany({
        where: { token: refreshToken, userId },
        data: { revokedAt: new Date() },
      });
    } else {
      await this.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }

    await this.auditService.log({
      actorId: userId,
      action: 'LOGOUT',
      ipAddress,
    });

    return { success: true, message: 'Logged out successfully' };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) throw new BadRequestException('Current password is incorrect');

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    await this.auditService.log({
      actorId: userId,
      action: 'UPDATE',
      entityType: 'USER',
      entityId: userId,
      entityLabel: 'Password changed',
    });

    return { success: true, message: 'Password changed successfully' };
  }

  private extractPermissions(user: {
    employeeId: string | null;
    employee?: {
      roles: Array<{
        role: {
          permissions: Array<{ permission: { code: string } }>;
        };
      }>;
    } | null;
  }): string[] {
    const set = new Set<string>();
    if (user.employee?.roles) {
      for (const er of user.employee.roles) {
        for (const rp of er.role.permissions) {
          set.add(rp.permission.code);
        }
      }
    }
    return Array.from(set);
  }

  private async getPermissionsForUser(userId: string, employeeId: string | null): Promise<string[]> {
    if (!employeeId) {
      const customerRole = await this.prisma.role.findUnique({
        where: { code: 'CUSTOMER' },
        include: { permissions: { include: { permission: true } } },
      });
      return customerRole?.permissions.map((rp) => rp.permission.code) ?? [];
    }

    const employeeRoles = await this.prisma.employeeRole.findMany({
      where: { employeeId },
      include: {
        role: { include: { permissions: { include: { permission: true } } } },
      },
    });

    const set = new Set<string>();
    for (const er of employeeRoles) {
      for (const rp of er.role.permissions) {
        set.add(rp.permission.code);
      }
    }
    return Array.from(set);
  }

  private async generateTokens(
    userId: string,
    email: string,
    type: string,
    permissions: string[],
    ids: { employeeId?: string; customerId?: string },
    ipAddress?: string,
    userAgent?: string,
  ) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      type: type as JwtPayload['type'],
      permissions,
      ...ids,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRY') || '15m',
    });

    const refreshTokenValue = randomBytes(64).toString('hex');
    const refreshExpiry = this.configService.get('JWT_REFRESH_EXPIRY') || '7d';
    const expiresAt = new Date(Date.now() + this.parseExpiry(refreshExpiry));

    await this.prisma.refreshToken.create({
      data: {
        token: refreshTokenValue,
        userId,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    return { accessToken, refreshToken: refreshTokenValue, expiresIn: refreshExpiry };
  }

  private parseExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 7 * 24 * 60 * 60 * 1000;
    const value = parseInt(match[1]!, 10);
    const unit = match[2];
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
    return value * (multipliers[unit!] ?? multipliers.d!);
  }
}
