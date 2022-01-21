import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Settings } from '../settings.entity';

@Injectable()
export class SettingsQueryService {
  private tableName = 'settings';

  constructor(
    @InjectRepository(Settings)
    private readonly repository: Repository<Settings>,
  ) {}

  async getSettings(): Promise<Settings> {
    const settings = await this.repository.createQueryBuilder(this.tableName).getOne();

    if (!settings) {
      throw new NotFoundException('Not found Settings');
    }

    return settings;
  }
}
