import { Controller, Param, UseGuards, Get } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SettingsQueryService } from '../services';

@Controller('settings')
@ApiUseTags('Settings')
export class SettingsController {
  constructor(private readonly queryService: SettingsQueryService) {}

  @Get()
  @ApiOperation({ title: 'Get settings' })
  @UseGuards(AuthGuard())
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

}

