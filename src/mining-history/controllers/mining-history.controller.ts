import { Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { MiningHistoryQueryService, MiningHistoryCrudService } from '../services';
import { User } from '../../users/user.entity';

@Controller('mining-history')
@ApiUseTags('Mining History')
@UseGuards(AuthGuard())
export class MiningHistoryController {
  constructor(
    private readonly crudService: MiningHistoryCrudService,
    private readonly queryService: MiningHistoryQueryService,
  ) {}

  @Get('/user')
  @ApiOperation({
    title: 'Get list of mining history for user',
  })
  @UseGuards(AuthGuard())
  async getByUser(@Req() { user }: { user: User }) {
    return this.queryService.getByUser(user.id);
  }

  @Get()
  @ApiOperation({
    title: 'Get overall mining history',
  })
  @UseGuards(AuthGuard())
  async getOverall() {
    return this.queryService.getOverall();
  }
}
