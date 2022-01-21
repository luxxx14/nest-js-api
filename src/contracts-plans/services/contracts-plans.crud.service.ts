import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContractsPlansQueryService } from './contracts-plans.query.service';
import { ContractsPlans } from '../contracts-plans.entity';
import { CreatePlanDto, UpdatePlanDto } from '../dto';

@Injectable()
export class ContractsPlansCrudService {
  constructor(
    @InjectRepository(ContractsPlans)
    private readonly contractsPlansRepository: Repository<ContractsPlans>,
    private readonly contractsPlansQueryService: ContractsPlansQueryService,
  ) {}

  async create(planDto: CreatePlanDto): Promise<ContractsPlans> {
    return this.contractsPlansRepository.save(planDto);
  }

  async update( id: number, planDto: UpdatePlanDto): Promise<ContractsPlans> {
    await this.contractsPlansRepository.update(id, planDto);
    return this.contractsPlansQueryService.getById(id);
  }

  async delete(id: number): Promise<ContractsPlans> {
    const contractsPlan = await this.contractsPlansQueryService.getById(id);
    return this.contractsPlansRepository.remove(contractsPlan);
  }
}
