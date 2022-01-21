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
import { ContractsPlansQueryService, ContractsPlansCrudService } from '../services';
import { AdminRoleGuard } from '../../auth/guards';
import { AdminPaginatorInterceptor } from '../../interceptors/admin-paginator.interceptor';
import { CreatePlanDto, UpdatePlanDto } from '../dto';
import { parseIdQueryHelper } from '../../common';

@Controller('admin/contracts-plans')
@ApiUseTags('[admin] Contracts Plans')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class ContractsPlansAdminController {
  constructor(
    private readonly crudService: ContractsPlansCrudService,
    private readonly queryService: ContractsPlansQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create new contracts plan' })
  async create(@Body() planDto: CreatePlanDto) {
    return this.crudService.create(planDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get list of contracts plans',
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
    title: 'Get contracts plan by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update contracts plan properties' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() planDto: UpdatePlanDto) {
    return this.crudService.update(id, planDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete contracts plan by id' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}
