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
import { EstateService } from './estate.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions, Public } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '@nhgp/types';

@Controller('estates')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @Public()
  @Get('public')
  findPublic(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.estateService.findAll({ page, limit, search });
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @RequirePermissions('estate.read')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('companyId') companyId?: string,
  ) {
    return this.estateService.findAll({ page, limit, search, status, companyId });
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':id')
  @RequirePermissions('estate.read')
  findOne(@Param('id') id: string) {
    return this.estateService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @RequirePermissions('estate.create')
  create(@Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedUser) {
    return this.estateService.create(body, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  @RequirePermissions('estate.update')
  update(
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.estateService.update(id, body as never, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post(':id/phases')
  @RequirePermissions('estate.update')
  addPhase(
    @Param('id') id: string,
    @Body() body: { name: string; code: string; description?: string; totalPlots?: number },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.estateService.addPhase(id, body, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post(':id/blocks')
  @RequirePermissions('estate.update')
  addBlock(
    @Param('id') id: string,
    @Body() body: { name: string; code: string; section?: string; totalPlots?: number },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.estateService.addBlock(id, body, user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post(':id/infrastructure')
  @RequirePermissions('estate.update')
  addInfrastructure(
    @Param('id') id: string,
    @Body() body: { name: string; type: string; description?: string },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.estateService.addInfrastructure(id, body, user);
  }
}
