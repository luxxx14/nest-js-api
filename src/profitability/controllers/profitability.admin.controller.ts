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
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ProfitabilityCrudService, ProfitabilityQueryService } from '../services';
import { AdminPaginationInterceptor } from '../../interceptors/admin-pagination.interceptor';
import { AdminRoleGuard } from '../../auth/guards';
import { CreateProfitability, UpdateProfitability } from '../dto';
import { parseIdQueryHelper } from '../../common';


@Controller('admin/profitability')
@ApiUseTags('[admin] Profitability')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class ProfitabilityAdminController {
  constructor(
    private readonly crudService: ProfitabilityCrudService,
    private readonly queryService: ProfitabilityQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create new profitability' })
  async create(@Body() profitabilityDto: CreateProfitability) {
    return this.crudService.create(profitabilityDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get list of profitability',
  })
  @UseInterceptors(AdminPaginationInterceptor)
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
    title: 'Get profitability by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update profitability properties' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() profitabilityDto: UpdateProfitability) {
    return this.crudService.update(id, profitabilityDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete profitability by id' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}

