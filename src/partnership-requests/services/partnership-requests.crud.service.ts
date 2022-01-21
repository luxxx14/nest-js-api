import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PartnershipRequestsQueryService } from '../services';
import { PartnershipRequests } from '../partnership-requests.entity';
import { CreatePartnershipRequestDto, UpdatePartnershipRequestDto } from '../dto';

@Injectable()
export class PartnershipRequestsCrudService {
  constructor(
    @InjectRepository(PartnershipRequests)
    private readonly repository: Repository<PartnershipRequests>,
    private readonly queryService: PartnershipRequestsQueryService,
  ) {}

  async create(dto: CreatePartnershipRequestDto): Promise<PartnershipRequests> {
    return this.repository.save(dto);
  }

  async update(id: number, dto: UpdatePartnershipRequestDto): Promise<PartnershipRequests> {
    await this.repository.update(id, dto);
    return this.queryService.getById(id);
  }

  async delete(id: number): Promise<PartnershipRequests> {
    const contract = await this.queryService.getById(id);
    return this.repository.remove(contract);
  }
}
