import { Controller, Post, UseGuards, Req, Body, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { WithdrawalRequestsCrudService, WithdrawalRequestsQueryService } from '../services';
import { User } from '../../users/user.entity';
import { RequestWithdrawalDto } from '../dto';

@Controller('withdrawal-requests')
@ApiUseTags('Withdrawal Requests')
export class WithdrawalRequestsController {
  constructor(
    private readonly crudService: WithdrawalRequestsCrudService,
    private readonly queryService: WithdrawalRequestsQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Request withdrawal' })
  @UseGuards(AuthGuard())
  async create(@Req() { user }: { user: User }, @Body() dto: RequestWithdrawalDto) {
    return this.crudService.create({ userId: user.id, ...dto });
  }

  @Get()
  @ApiOperation({ title: 'Get personal withdrawal requests' })
  @UseGuards(AuthGuard())
  async getAll(@Req() { user }: { user: User }, @Query() query) {
    const { _end, _order, _sort, _start } = query;
    return this.queryService.getAllByUserId({
      userId: user.id,
      _start,
      _end,
      _order,
      _sort,
    });
  }
}
