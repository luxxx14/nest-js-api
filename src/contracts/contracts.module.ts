import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ContractsPlansModule } from '../contracts-plans/contracts-plans.module';
import { ContractsController, ContractsAdminController } from './controllers';
import { ContractsService, ContractsCrudService, ContractsQueryService } from './services';
import { Contracts } from './contracts.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contracts]), AuthModule, UsersModule, ContractsPlansModule, MailModule],
  providers: [ContractsCrudService, ContractsQueryService, ContractsService],
  controllers: [ContractsController, ContractsAdminController],
  exports: [ContractsQueryService, ContractsService],
})
export class ContractsModule {}
