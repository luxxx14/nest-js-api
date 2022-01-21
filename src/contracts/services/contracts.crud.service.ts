import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersQueryService } from '../../users/services';
import { ContractsQueryService } from './contracts.query.service';
import { ContractsPlansQueryService } from '../../contracts-plans/services';
import { Contracts } from '../contracts.entity';
import { CreateContractDto, UpdateContractDto } from '../dto';
import { MailService } from '../../mail/mail.service';
import { notification } from '../../mail/templates/notification';

@Injectable()
export class ContractsCrudService {
  constructor(
    @InjectRepository(Contracts)
    private readonly contractsRepository: Repository<Contracts>,
    private readonly queryService: ContractsQueryService,
    private readonly usersQueryService: UsersQueryService,
    private readonly contractsPlansQueryService: ContractsPlansQueryService,
    private readonly mailService: MailService,
  ) {}

  async create(contractDto: CreateContractDto): Promise<Contracts> {
    const user = await this.usersQueryService.getUserById(contractDto.userId);
    const contractsPlan = await this.contractsPlansQueryService.getById(
      contractDto.contractsPlanId,
    );

    const { tHsPrice } = contractsPlan;
    const contractPrice = contractDto.rate * tHsPrice;
    if (user && contractsPlan) {
      await this.mailService.send({
        from: process.env.MAILGUN_SENDER_EMAIL,
        to: user.email,
        subject: 'Invoice notification',
        html: notification(),
      });
    }

    return this.contractsRepository.save({ ...contractDto, contractPrice, user, contractsPlan });
  }

  async update(id: number, contractDto: UpdateContractDto): Promise<Contracts> {
    await this.contractsRepository.update(id, contractDto);
    return this.queryService.getById(id);
  }

  async delete(id: number): Promise<Contracts> {
    const contract = await this.queryService.getById(id);
    return this.contractsRepository.remove(contract);
  }
}
