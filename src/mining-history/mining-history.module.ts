import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ContractsModule } from '../contracts/contracts.module';
import { SettingsModule } from './../settings/settings.module';
import { MiningHistoryAdminController, MiningHistoryController } from './controllers';
import {
  MiningHistoryCrudService,
  MiningHistoryQueryService,
  MiningHistoryScheduleService,
} from './services';
import { MiningHistory } from './mining-history.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MiningHistory]),
    AuthModule,
    UsersModule,
    ContractsModule,
    SettingsModule,
    MailModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [MiningHistoryCrudService, MiningHistoryQueryService, MiningHistoryScheduleService],
  controllers: [MiningHistoryAdminController, MiningHistoryController],
  exports: [MiningHistoryCrudService, MiningHistoryQueryService],
})
export class MiningHistoryModule {}
