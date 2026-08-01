import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '@nhgp/types';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  findAll(
    @Query()
    query: {
      page?: string;
      limit?: string;
      status?: string;
      search?: string;
    },
  ) {
    return this.saleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      propertyId: string;
      customerId: string;
      reservationId?: string;
      type?: string;
      salePrice: number;
      discountAmount?: number;
      installmentMonths?: number;
      downPayment?: number;
      notes?: string;
      salesAgentId?: string;
    },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.saleService.create({ ...body, createdById: user.id });
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.saleService.updateStatus(id, body.status, body.notes, user.id);
  }
}
