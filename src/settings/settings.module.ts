import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { SettingsQueryService, SettingsCrudService } from './services';
import { SettingsController, SettingsAdminController } from './controllers';
import { Settings } from './settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Settings]), AuthModule, UsersModule],
  providers: [SettingsCrudService, SettingsQueryService],
  controllers: [SettingsController, SettingsAdminController],
  exports: [SettingsCrudService, SettingsQueryService],
})
export class SettingsModule {}
