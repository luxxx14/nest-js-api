import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

import { UsersQueryService } from './users.query.service';
import { USER_ROLES } from '../../constants';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UsersCrudService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const user: User = await this.repository.findOne({ email: userData.email });

    if (user) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: [{ email: 'Email must be unique.' }],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.password = userData.password;
    newUser.twoFactorAuthEnabled = false;
    newUser.twoFactorSecret = '';
    newUser.role = USER_ROLES.user;
    newUser.signUpConfirmed = false;
    newUser.verifyId = '';
    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errors,
          message: 'Input data validation failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.repository.save(newUser);
    }
  }

  async update({ id, userData }: { id: number; userData: UpdateUserDto }): Promise<User> {
    await this.repository.update(id, userData);
    return this.usersQueryService.getUserById(id);
  }

  async delete(id: number): Promise<User> {
    const user = await this.usersQueryService.getUserById(id);
    return this.repository.remove(user);
  }
}
