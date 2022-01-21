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

import { ContractsCrudService, ContractsQueryService } from '../services';
import { CreateContractDto, UpdateContractDto } from '../dto';
import { AdminRoleGuard } from '../../auth/guards';
import { AdminPaginatorInterceptor } from '../../interceptors/admin-paginator.interceptor';
import { parseIdQueryHelper } from '../../common';

@Controller('admin/contracts')
@ApiUseTags('[admin] Contracts')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class ContractsAdminController {
  constructor(
    private readonly crudService: ContractsCrudService,
    private readonly queryService: ContractsQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create contract' })
  async create(@Body() contractDto: CreateContractDto) {
    return this.crudService.create(contractDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get list of contracts',
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
    title: 'Get contract by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update contract properties' })
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() contractDto: UpdateContractDto) {
    return this.crudService.update(id, contractDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete contract by id' })
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}
