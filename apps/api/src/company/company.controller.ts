import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '@nhgp/types';

@Controller('companies')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @RequirePermissions('company.update')
  create(@Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedUser) {
    return this.companyService.create(body as never, user);
  }

  @Get()
  @RequirePermissions('company.read')
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.companyService.findAll(page, limit);
  }

  @Get(':id')
  @RequirePermissions('company.read')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions('company.update')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedUser) {
    return this.companyService.update(id, body as never, user);
  }

  @Post(':id/branches')
  @RequirePermissions('company.update')
  createBranch(@Param('id') id: string, @Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedUser) {
    return this.companyService.createBranch(id, body as never, user);
  }
}
