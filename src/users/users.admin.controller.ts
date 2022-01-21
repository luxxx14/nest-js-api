import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Query,
  Param,
  Post,
  Body,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { UsersCrudService, UsersQueryService } from './services';
import { AdminRoleGuard } from '../auth/guards';
import { AdminPaginatorInterceptor } from '../interceptors/admin-paginator.interceptor';
import { CreateUserDto, UpdateUserDto } from './dto';
import { parseIdQueryHelper } from '../common';

@Controller('admin/users')
@ApiUseTags('[admin] Users')
@UseGuards(AuthGuard(), AdminRoleGuard)
export class UsersAdminController {
  constructor(
    private readonly crudService: UsersCrudService,
    private readonly queryService: UsersQueryService,
  ) {}

  @Get()
  @ApiOperation({ title: 'Get user(s) data' })
  @UseInterceptors(AdminPaginatorInterceptor)
  async get(@Query() query) {
    const { id, _end, _order, _sort, _start } = query;

    if (id) {
      const ids: number[] = parseIdQueryHelper(id);
      const entities = await this.queryService.getUsersByIds(ids);
      return {
        entities,
        totalCount: entities.length,
      };
    }

    return this.queryService.getAllUsers({
      _start,
      _end,
      _order,
      _sort,
    });
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get user by id',
  })
  async getOne(@Param() { id }: { id: number }) {
    return this.queryService.getUserById(id);
  }

  @Post()
  @ApiOperation({ title: 'Create new user' })
  async create(@Body() userData: CreateUserDto) {
    return this.crudService.create(userData);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update user' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto) {
    return this.crudService.update({ id, userData });
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete user by id' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.delete(id);
  }
}
