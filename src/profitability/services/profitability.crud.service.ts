import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profitability } from '../profitability.entity';
import { ProfitabilityQueryService } from './profitability.query.service';
import { CreateProfitability, UpdateProfitability } from '../dto';

@Injectable()
export class ProfitabilityCrudService {
  constructor(
    @InjectRepository(Profitability)
    private readonly repository: Repository<Profitability>,
    private readonly queryService: ProfitabilityQueryService,
  ) {}

  async create(profitability: CreateProfitability): Promise<Profitability> {
    return this.repository.save(profitability);
  }

  async update(id: number, profitability: UpdateProfitability): Promise<Profitability> {
    await this.repository.update(id, profitability);
    return this.queryService.getById(id);
  }

  async delete(id: number): Promise<Profitability> {
    const pr = await this.queryService.getById(id);
    return this.repository.remove(pr);
  }
}



