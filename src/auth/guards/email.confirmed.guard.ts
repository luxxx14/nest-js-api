import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';

@Injectable()
export class EmailConfirmedGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { email } = req.body;
    const user = await this.userRepository.findOne({ email: email });
    if (user && !user.signUpConfirmed) {
      throw new ForbiddenException('Email dont confirmed');
    }
    return true;
  }
}
