import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { ProfitabilityQueryService } from '../services';

@Controller('profitability')
@ApiUseTags('Profitability')
export class ProfitabilityController {
  constructor(private readonly queryService: ProfitabilityQueryService) {}

  @Get()
  @ApiOperation({ title: 'Get list of profitability' })
  async getAll(@Query() query) {
    return this.queryService.getAllEntities();
  }

  @Get('/last')
  @ApiOperation({ title: 'Get last profitability' })
  async getLast() {
    return this.queryService.getLast();
  }
}
