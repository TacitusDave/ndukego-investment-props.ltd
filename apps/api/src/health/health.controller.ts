import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    await this.prisma.$queryRaw`SELECT 1`;
    return {
      success: true,
      data: {
        status: 'healthy',
        service: 'NHGP API',
        version: '1.22.0',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
