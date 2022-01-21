import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  UseInterceptors,
  Put,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { MiningHistoryQueryService, MiningHistoryCrudService } from '../services';
import { AdminRoleGuard } from '../../auth/guards';
import { AdminPaginatorInterceptor } from '../../interceptors/admin-paginator.interceptor';
import { CreateMiningHistory, UpdateMiningHistory } from '../dto';
import { parseIdQueryHelper } from '../../common';

@Controller('admin/mining-history')
@ApiUseTags('[admin] Mining History')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class MiningHistoryAdminController {
  constructor(
    private readonly crudService: MiningHistoryCrudService,
    private readonly queryService: MiningHistoryQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create new mining history' })
  async create(@Body() historyDto: CreateMiningHistory) {
    return this.crudService.create(historyDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get list of mining history',
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
    title: 'Get mining history by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update mining history properties' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() historyDto: UpdateMiningHistory) {
    return this.crudService.update(id, historyDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete mining history by id' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}
