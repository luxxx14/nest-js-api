import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersQueryService } from '../../users/services';
import { MiningHistory } from '../mining-history.entity';
import { PaginationInterface } from '../../interfaces';
import { QueryBuilderOrder } from '../../types';
import { CONTRACTS_STATUSES } from '../../constants';

@Injectable()
export class MiningHistoryQueryService {
  private tableName = 'miningHistory';

  constructor(
    @InjectRepository(MiningHistory)
    private readonly repository: Repository<MiningHistory>,
    private readonly usersQueryService: UsersQueryService,
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

  async getById(id: number): Promise<MiningHistory> {
    const contractsPlan = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id })
      .getOne();

    if (!contractsPlan) {
      throw new NotFoundException(`Not found MiningHistory with id=${id}`);
    }

    return contractsPlan;
  }

  async getByIds(ids: number[]): Promise<MiningHistory[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .getMany();
  }

  async getByUser(userId: number): Promise<MiningHistory[]> {
    const user = await this.usersQueryService.getUserById(userId);
    return this.repository
      .createQueryBuilder(this.tableName)
      .select([
        `to_char(${this.tableName}.createdAt, 'DD/MM/yyyy') as date`,
        `SUM(${this.tableName}.mining) as mining`,
        `SUM(${this.tableName}.bonus) as bonus`,
        `SUM(${this.tableName}.profit) as profit`,
      ])
      .where(`${this.tableName}.contractId IN (:...ids)`, { ids: user.contractsIds })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
  }

  async getOverall(): Promise<MiningHistory[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .select([
        `to_char(${this.tableName}.createdAt, 'DD/MM/yyyy') as date`,
        `SUM(${this.tableName}.mining) as mining`,
        `SUM(${this.tableName}.bonus) as bonus`,
        `SUM(${this.tableName}.profit) as profit`,
      ])
      .where(`${this.tableName}.status = :status`, { status: CONTRACTS_STATUSES.active })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
  }
}
