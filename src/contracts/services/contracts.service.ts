import { User } from './../../users/user.entity';
import { ContractsQueryService } from './contracts.query.service';
import { Injectable } from '@nestjs/common';

import { ContractsCrudService } from '../services';
import { Contracts } from '../contracts.entity';
import { SignContractDto } from '../dto';

import { Type, plainToClass, deserialize } from 'class-transformer';

/*import { Poloniex } from 'poloniex-api-node';*/

@Injectable()
export class ContractsService {
  BTC: number;
  constructor(
    private readonly crudService: ContractsCrudService,
    private readonly queryService: ContractsQueryService,
  ) {}

  async test3(userId: number): Promise<any> {
    return userId;
  }

  async signContract(userId: number, contractDto: SignContractDto): Promise<Contracts> {
    test(userId.toString());
    return this.crudService.create({ userId, ...contractDto });
  }

  async getUserContracts(ids: number[]): Promise<Contracts[]> {
    return this.queryService.getOnlyActive(ids);
  }

  async getOverallHashRate(): Promise<Contracts[]> {
    return this.queryService.getOverallHashRate();
  }
}
