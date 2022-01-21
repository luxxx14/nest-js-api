import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WithdrawalRequestsQueryService } from '../services';
import { UsersQueryService } from '../../users/services';
import { WithdrawalRequests } from '../withdrawal-requests.entity';
import { CreateWithdrawalRequestDto, UpdateWithdrawalRequestDto } from '../dto';

@Injectable()
export class WithdrawalRequestsCrudService {
  constructor(
    @InjectRepository(WithdrawalRequests)
    private readonly repository: Repository<WithdrawalRequests>,
    private readonly queryService: WithdrawalRequestsQueryService,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  async create(withdrawalRequestDto: CreateWithdrawalRequestDto): Promise<WithdrawalRequests> {
    const user = await this.usersQueryService.getUserById(withdrawalRequestDto.userId);
    return this.repository.save({ ...withdrawalRequestDto, user });
  }

  async update(id: number, dto: UpdateWithdrawalRequestDto): Promise<WithdrawalRequests> {
    await this.repository.update(id, dto);
    return this.queryService.getById(id);
  }

  async delete(id: number): Promise<WithdrawalRequests> {
    const contract = await this.queryService.getById(id);
    return this.repository.remove(contract);
  }
}
