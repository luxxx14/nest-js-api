import { JwtService } from '@nestjs/jwt';
import { Injectable, forwardRef, Inject } from '@nestjs/common';

import { User } from '../users/user.entity';
import { UsersService } from '../users/services';
import { JwtPayload, AuthToken } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(email: string): Promise<AuthToken> {
    const user: JwtPayload = { email };
    
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 360000,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.usersService.findAuthUser(payload.email);
  }
}
