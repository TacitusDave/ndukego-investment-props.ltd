import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions, Public } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '@nhgp/types';
import { PropertyStatus } from '@nhgp/database';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Public()
  @Get('public')
  findPublic(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('type') type?: string,
    @Query('estateId') estateId?: string,
    @Query('featured') featured?: boolean,
  ) {
    return this.propertyService.findAll({
      page, limit, search, category, type, estateId, featured, publicOnly: true,
    });
  }

  @Public()
  @Get('public/:id')
  findPublicOne(@Param('id') id: string) {
    return this.propertyService.findOne(id, true);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @RequirePermissions('property.read')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: PropertyStatus,
    @Query('category') category?: string,
    @Query('estateId') estateId?: string,
  ) {
    return this.propertyService.findAll({ page, limit, search, status, category, estateId });
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':id')
  @RequirePermissions('property.read')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @RequirePermissions('property.create')
  create(@Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedUser) {
    return this.propertyService.create(body as never, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  @RequirePermissions('property.update')
  update(
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.propertyService.update(id, body as never, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post(':id/status')
  @RequirePermissions('property.update')
  transitionStatus(
    @Param('id') id: string,
    @Body() body: { status: PropertyStatus; reason?: string },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.propertyService.transitionStatus(id, body.status, body.reason, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  @RequirePermissions('property.delete')
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.propertyService.softDelete(id, user);
  }
}
