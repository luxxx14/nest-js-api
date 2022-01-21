import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { ProfitabilityAdminController, ProfitabilityController } from './controllers';
import { ProfitabilityCrudService, ProfitabilityQueryService } from './services';
import { Profitability } from './profitability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profitability]), AuthModule],
  providers: [ProfitabilityCrudService, ProfitabilityQueryService],
  controllers: [ProfitabilityAdminController, ProfitabilityController],
  exports: [ProfitabilityCrudService, ProfitabilityQueryService],
})
export class ProfitabilityModule {}

