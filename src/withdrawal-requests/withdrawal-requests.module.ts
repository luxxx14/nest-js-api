import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { WithdrawalRequestsController, WithdrawalRequestsAdminController } from './controllers';
import {
  WithdrawalRequestsQueryService,
  WithdrawalRequestsCrudService,
  WithdrawalRequestsService,
} from './services';
import { WithdrawalRequests } from './withdrawal-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WithdrawalRequests]), AuthModule, UsersModule],
  providers: [
    WithdrawalRequestsQueryService,
    WithdrawalRequestsCrudService,
    WithdrawalRequestsService,
  ],
  controllers: [WithdrawalRequestsAdminController, WithdrawalRequestsController],
})
export class WithdrawalRequestsModule {}
