import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MiningHistoryQueryService } from './mining-history.query.service';
import { MiningHistory } from '../mining-history.entity';
import { CreateMiningHistory, UpdateMiningHistory } from '../dto';

@Injectable()
export class MiningHistoryCrudService {
  constructor(
    @InjectRepository(MiningHistory)
    private readonly repository: Repository<MiningHistory>,
    private readonly queryService: MiningHistoryQueryService,
  ) {}

  async create(miningHostory: CreateMiningHistory): Promise<MiningHistory> {
    return this.repository.save(miningHostory);
  }

  async update(id: number, miningHostory: UpdateMiningHistory): Promise<MiningHistory> {
    await this.repository.update(id, miningHostory);
    return this.queryService.getById(id);
  }

  async delete(id: number): Promise<MiningHistory> {
    const contractsPlan = await this.queryService.getById(id);
    return this.repository.remove(contractsPlan);
  }
}
