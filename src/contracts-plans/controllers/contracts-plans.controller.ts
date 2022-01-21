import { Controller, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { ContractsPlansQueryService } from '../services';

@ApiUseTags('Contracts Plans')
@Controller('contracts-plans')
export class ContractsPlansController {
  constructor(private readonly queryService: ContractsPlansQueryService) {}

  @Get()
  @ApiOperation({
    title: 'Get published list of contract plans',
  })
  async getAllPublished() {
    return this.queryService.getAllPublished();
  }
}
