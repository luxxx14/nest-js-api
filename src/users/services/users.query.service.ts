import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { User } from '../user.entity';
import { QueryBuilderOrder } from '../../types';
import { PaginationInterface } from '../../interfaces/pagination.interface';

@Injectable()
export class UsersQueryService {
  private tableName = 'user';

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAuthUser(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, {
        id,
      })
      .select([
        `${this.tableName}.id`,
        `${this.tableName}.name`,
        `${this.tableName}.email`,
        `${this.tableName}.createdAt`,
        `${this.tableName}.updatedAt`,
        `${this.tableName}.twoFactorAuthEnabled`,
      ])
      .getOne();

    if (!user) {
      throw new NotFoundException(`Not found User with id=${id}`);
    }

    return user;
  }

  async getUsersByIds(ids: number[]): Promise<User[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .select([
        `${this.tableName}.id`,
        `${this.tableName}.name`,
        `${this.tableName}.email`,
        `${this.tableName}.createdAt`,
        `${this.tableName}.updatedAt`,
        `${this.tableName}.twoFactorAuthEnabled`,
      ])
      .getMany();
  }

  async getAllUsers({
    _start = 0,
    _end = 10,
    _order = 'DESC',
    _sort = 'id',
  }: {
    _start: number;
    _end: number;
    _order: QueryBuilderOrder;
    _sort: string;
  }): Promise<PaginationInterface> {
    const totalCount = await this.repository
      .createQueryBuilder(this.tableName)
      .select([
        `${this.tableName}.id`,
        `${this.tableName}.name`,
        `${this.tableName}.email`,
        `${this.tableName}.createdAt`,
        `${this.tableName}.updatedAt`,
        `${this.tableName}.twoFactorAuthEnabled`,
      ])
      .getCount();

    const entities = await this.repository
      .createQueryBuilder(this.tableName)
      .select([
        `${this.tableName}.id`,
        `${this.tableName}.name`,
        `${this.tableName}.email`,
        `${this.tableName}.createdAt`,
        `${this.tableName}.updatedAt`,
        `${this.tableName}.twoFactorAuthEnabled`,
      ])
      .skip(_start)
      .take(Math.abs(_end - _start))
      .orderBy(`user.${_sort}`, _order)
      .getMany();

    return {
      entities,
      totalCount,
    };
  }

  async findByCredentials({ email, password }: { email: string; password: string }): Promise<User> {
    const user = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.email = :email`, {
        email,
      })
      .andWhere(`${this.tableName}.password = :password`, {
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .select([
        `${this.tableName}.id`,
        `${this.tableName}.name`,
        `${this.tableName}.email`,
        `${this.tableName}.createdAt`,
        `${this.tableName}.updatedAt`,
        `${this.tableName}.twoFactorAuthEnabled`,
        `${this.tableName}.twoFactorSecret`,
        `${this.tableName}.signUpConfirmed`,
        `${this.tableName}.verifyId`,
      ])
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
