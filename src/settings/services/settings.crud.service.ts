import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SettingsQueryService } from './settings.query.service';
import { Settings } from '../settings.entity';

@Injectable()
export class SettingsCrudService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
    private readonly settingsQueryService: SettingsQueryService,
  ) {}

  async update(settingsDto: Partial<Settings>): Promise<Settings> {
    const settings: Settings = await this.settingsQueryService.getSettings();
    await this.settingsRepository.update(settings.id, settingsDto);
    return this.settingsQueryService.getSettings();
  }
}
