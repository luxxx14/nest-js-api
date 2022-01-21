import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './users.controller';
import { UsersAdminController } from './users.admin.controller';
import { UsersCrudService, UsersQueryService, UsersService } from './services';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AuthModule),
    MailModule,
  ],
  controllers: [UsersController, UsersAdminController],
  providers: [UsersCrudService, UsersQueryService, UsersService],
  exports: [UsersService, UsersQueryService],
})
export class UsersModule {}
