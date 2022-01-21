import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WithdrawalRequests } from '../withdrawal-requests.entity';
import { QueryBuilderOrder } from '../../types';
import { PaginationInterface } from '../../interfaces';

@Injectable()
export class WithdrawalRequestsQueryService {
  private tableName = 'withdrawalRequests';

  constructor(
    @InjectRepository(WithdrawalRequests)
    private readonly repository: Repository<WithdrawalRequests>,
  ) {}

  async getAll({
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
    const totalCount = await this.repository.createQueryBuilder(this.tableName).getCount();

    const entities = await this.repository
      .createQueryBuilder(this.tableName)
      .skip(_start)
      .take(Math.abs(_end - _start))
      .orderBy(`${this.tableName}.${_sort}`, _order)
      .getMany();

    return {
      entities,
      totalCount,
    };
  }

  async getAllByUserId({
    userId,
    _start = 0,
    _end = 10,
    _order = 'DESC',
    _sort = 'id',
  }: {
    userId: number,
    _start: number;
    _end: number;
    _order: QueryBuilderOrder;
    _sort: string;
  }): Promise<PaginationInterface> {
    const totalCount = await this.repository.createQueryBuilder(this.tableName).getCount();

    const entities = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.userId = :userId`, { userId })
      .skip(_start)
      .take(Math.abs(_end - _start))
      .orderBy(`${this.tableName}.${_sort}`, _order)
      .getMany();

    return {
      entities,
      totalCount,
    };
  }

  async getById(id: number): Promise<WithdrawalRequests> {
    const contract = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id })
      .getOne();

    if (!contract) {
      throw new NotFoundException(`Not found contract with id=${id}`);
    }

    return contract;
  }

  async getByIds(ids: number[]): Promise<WithdrawalRequests[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .getMany();
  }
}
