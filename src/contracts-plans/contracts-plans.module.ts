import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { ContractsPlansController, ContractsPlansAdminController } from './controllers';
import { ContractsPlansQueryService, ContractsPlansCrudService } from './services';
import { ContractsPlans } from './contracts-plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractsPlans]), AuthModule],
  providers: [ContractsPlansQueryService, ContractsPlansCrudService],
  controllers: [ContractsPlansController, ContractsPlansAdminController],
  exports: [ContractsPlansQueryService],
})
export class ContractsPlansModule {}
