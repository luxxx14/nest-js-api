import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profitability } from '../profitability.entity';
import { QueryBuilderOrder } from '../../types';
import { PaginationInterface } from '../../interfaces';

@Injectable()
export class ProfitabilityQueryService {
  private tableName = 'profitability';

  constructor(
    @InjectRepository(Profitability)
    private readonly repository: Repository<Profitability>,
  ) {}

  async getById(id: number): Promise<Profitability> {
    const profitabilitys = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id })
      .getOne();

    if (!profitabilitys) {
      throw new NotFoundException(`Not found Profitability with id=${id}`);
    }

    return profitabilitys;
  }

  async getAllEntities(): Promise<Profitability[]> {
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
  }): Promise<Profitability[]> {
    const totalCount = await this.repository.createQueryBuilder(this.tableName).getCount();

    const entities = await this.repository
      .createQueryBuilder(this.tableName)
      .skip(_start)
      .take(Math.abs(_end - _start))
      .orderBy(`${this.tableName}.${_sort}`, _order)
      .getMany();

    return entities;
  }

  async getByIds(ids: number[]): Promise<Profitability[]> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id IN (:...ids)`, { ids })
      .getMany();
  }

  async getLast(): Promise<Profitability> {
    return this.repository
      .createQueryBuilder(this.tableName)
      .orderBy(`${this.tableName}.id`, 'DESC')
      .getOne();
  }
}




