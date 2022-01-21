import {
  Controller,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { SettingsQueryService, SettingsCrudService } from '../services';
import { AdminRoleGuard } from '../../auth/guards';
import { AdminPaginatorInterceptor } from '../../interceptors/admin-paginator.interceptor';
import { UpdateSettingsDto } from '../dto';

@Controller('admin/settings')
@ApiUseTags('[admin] Settings')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class SettingsAdminController {
  constructor(
    private readonly crudService: SettingsCrudService,
    private readonly queryService: SettingsQueryService,
  ) {}

  @Get()
  @ApiOperation({
    title: 'Get settings',
  })
  @UseInterceptors(AdminPaginatorInterceptor)
  async getAll() {
    const settings = await this.queryService.getSettings();
    const entities = [settings];
    return {
      entities,
      totalCount: entities.length,
    };
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get settings',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getSettings();
  }

  @Put(':id')
  @ApiOperation({ title: 'Update settings properties' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() settingsDto: UpdateSettingsDto) {
    return this.crudService.update(settingsDto);
  }

}
