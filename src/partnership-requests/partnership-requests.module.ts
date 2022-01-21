import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import {
  PartnershipRequestsService,
  PartnershipRequestsCrudService,
  PartnershipRequestsQueryService,
} from './services';
import { PartnershipRequestsAdminController, PartnershipRequestsController } from './controllers';
import { PartnershipRequests } from './partnership-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartnershipRequests]), AuthModule, UsersModule],
  providers: [
    PartnershipRequestsService,
    PartnershipRequestsCrudService,
    PartnershipRequestsQueryService,
  ],
  controllers: [PartnershipRequestsController, PartnershipRequestsAdminController],
})
export class PartnershipRequestsModule {}
