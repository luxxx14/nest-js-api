import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContractsPlans } from '../contracts-plans.entity';
import { PaginationInterface } from '../../interfaces';
import { QueryBuilderOrder } from '../../types';

@Injectable()
export class ContractsPlansQueryService {
  private tableName = 'contractsPlans';

  constructor(
    @InjectRepository(ContractsPlans)
    private readonly repository: Repository<ContractsPlans>,
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

  async getAllPublished(published = true): Promise<ContractsPlans[]> {
    const contractsPlans = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.published = :published`, { published })
      .select([
        `${this.tableName}.id`,
        `${this.tableName}.name`,
        `${this.tableName}.description`,
        `${this.tableName}.minRate`,
        `${this.tableName}.maxRate`,
        `${this.tableName}.tHsPrice`,
        `${this.tableName}.maint`,
        `${this.tableName}.period`,
        `${this.tableName}.periodValue`,
        `${this.tableName}.available`,
      ])
      .getMany();
    return contractsPlans;
  }

  async getById(id: number): Promise<ContractsPlans> {
    const contractsPlan = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id })
      .getOne();

    if (!contractsPlan) {
      throw new NotFoundException(`Not found ContractsPlans with id=${id}`);
    }

    return contractsPlan;
  }

  async getByIds(ids: number[]): Promise<ContractsPlans[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .getMany();
  }
}
