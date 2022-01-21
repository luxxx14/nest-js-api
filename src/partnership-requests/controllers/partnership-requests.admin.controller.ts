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

import { PartnershipRequestsCrudService, PartnershipRequestsQueryService } from '../services';
import { parseIdQueryHelper } from '../../common';
import { AdminRoleGuard } from '../../auth/guards';
import { AdminPaginatorInterceptor } from '../../interceptors/admin-paginator.interceptor';
import { CreatePartnershipRequestDto, UpdatePartnershipRequestDto } from '../dto';

@Controller('admin/partnership-requests')
@ApiUseTags('[admin] Partnership Requests')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class PartnershipRequestsAdminController {
  constructor(
    private readonly crudService: PartnershipRequestsCrudService,
    private readonly queryService: PartnershipRequestsQueryService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create partnership request' })
  async create(@Body() dto: CreatePartnershipRequestDto) {
    return this.crudService.create(dto);
  }

  @Get()
  @ApiOperation({
    title: 'Get list of partnership requests',
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
    title: 'Get partnership request by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update partnership request properties' })
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePartnershipRequestDto) {
    return this.crudService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete partnership request by id' })
  @UseGuards(AuthGuard(), AdminRoleGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}
