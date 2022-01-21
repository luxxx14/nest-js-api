import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET_KEY } from '../constants';

PassportModule.register({ session: true });

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 36000,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy, TwoFactorAuthService],
  exports: [PassportModule, AuthService, TwoFactorAuthService],
})
export class AuthModule {}
