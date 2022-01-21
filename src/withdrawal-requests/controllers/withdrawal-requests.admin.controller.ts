import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { WithdrawalRequestsCrudService, WithdrawalRequestsQueryService } from '../services';
import { parseIdQueryHelper } from '../../common';
import { AdminRoleGuard } from '../../auth/guards';
import { AdminPaginatorInterceptor } from '../../interceptors/admin-paginator.interceptor';
import { CreateWithdrawalRequestDto, UpdateWithdrawalRequestDto } from '../dto';

@Controller('admin/withdrawal-requests')
@ApiUseTags('[admin] Withdrawal Requests')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class WithdrawalRequestsAdminController {
  constructor(
    private readonly crudService: WithdrawalRequestsCrudService,
    private readonly queryService: WithdrawalRequestsQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create withdrawal request' })
  async create(@Body() dto: CreateWithdrawalRequestDto) {
    return this.crudService.create(dto);
  }

  @Get()
  @ApiOperation({
    title: 'Get list of withdrawal requests',
  })
  @UseInterceptors(AdminPaginatorInterceptor)
  async getAll(@Query() query) {
    const { id, _end, _order, _sort, _start } = query;

    if (id) {
      const ids: number[] = parseIdQueryHelper(id);
      const entities = await this.queryService.getByIds(ids);
      return {
        entities,
        totalCount: entities.length,
      };
    }

    return this.queryService.getAll({
      _start,
      _end,
      _order,
      _sort,
    });
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get withdrawal request by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update withdrawal request properties' })
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWithdrawalRequestDto) {
    return this.crudService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete withdrawal request by id' })
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}
