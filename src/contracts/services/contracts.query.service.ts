import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contracts } from '../contracts.entity';
import { QueryBuilderOrder } from '../../types';
import { PaginationInterface } from '../../interfaces';
import { CONTRACTS_STATUSES } from '../../constants';

@Injectable()
export class ContractsQueryService {
  private tableName = 'contracts';

  constructor(
    @InjectRepository(Contracts)
    private readonly repository: Repository<Contracts>,
  ) {}

  async getAllEntities(): Promise<Contracts[]> {
    return this.repository.createQueryBuilder(this.tableName).getMany();
  }

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

  async getById(id: number): Promise<Contracts> {
    const contract = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id })
      .getOne();

    if (!contract) {
      throw new NotFoundException(`Not found contract with id=${id}`);
    }

    return contract;
  }

  async getByIds(ids: number[]): Promise<Contracts[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .getMany();
  }

  async getOnlyActive(ids: number[]): Promise<Contracts[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .andWhere(`${this.tableName}.status = :status`, { status: CONTRACTS_STATUSES.active })
      .getMany();
  }

  async getOverallHashRate(): Promise<Contracts[]> {
    return (
      this.repository
        .createQueryBuilder(this.tableName)
        .select([
          `to_char(${this.tableName}.createdAt, 'DD/MM/yyyy') as date`,
          `SUM(${this.tableName}.rate) as rate`,
        ])
        .where(`${this.tableName}.status = :status`, { status: CONTRACTS_STATUSES.active })
        .groupBy('date')
        .getRawMany()
    );
  }
}
