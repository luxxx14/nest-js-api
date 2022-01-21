import { AuthUser } from '../interfaces/authUser.interface';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { TwoFactorAuthService } from '../../auth/two-factor-auth.service';
import { UsersQueryService } from './users.query.service';
import { UsersCrudService } from './users.crud.service';
import { User } from '../user.entity';
import { AuthToken, TwoFactorSecret } from './../../auth/interfaces';
import { SignUpUserDto, SignInUserDto, ChangePasswordDto, TwoFactorAuthDto } from '../dto';
import { MailService } from '../../mail/mail.service';
import { messageHTML } from '../../mail/templates/email-verification';
import { emailRegistration } from '../../mail/templates/email-registration';
import { v4 as uuidv4 } from 'uuid';
import { EMAIL_VERIFICATION } from '../../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly usersCrudService: UsersCrudService,
    private readonly usersQueryService: UsersQueryService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  findAuthUser(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  private async findById(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', {
        id,
      })
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.createdAt',
        'user.updatedAt',
        'user.twoFactorAuthEnabled',
        'user.twoFactorSecret',
        'user.signUpConfirmed',
        'user.verifyId',
      ])
      .getOne();

    if (!user) {
      throw new NotFoundException(`Not found User with id=${id}`);
    }

    return user;
  }

  getMe(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async signIn(userDto: SignInUserDto): Promise<AuthUser> {
    const user: User = await this.usersQueryService.findByCredentials({
      email: userDto.email,
      password: userDto.password,
    });
    if (!user) {
      throw new NotFoundException('Email or password is incorrect.');
    }

    if (user.twoFactorAuthEnabled) {
      const secretIsValid = this.twoFactorAuthService.verifySecret({
        secret: user.twoFactorSecret,
        code: userDto.code,
      });

      if (!secretIsValid) {
        throw new BadRequestException('Two-factor code is wrong.');
      }
    }

    const token: AuthToken = await this.authService.createToken(user.email);
    delete user.twoFactorSecret;
    delete user.signUpConfirmed;

    return {
      user,
      token,
    };
  }

  async signUp(userDto: SignUpUserDto): Promise<string> {
    try {
      const verifyId = uuidv4();
      await this.usersCrudService.create(userDto);
      const user: User = await this.usersQueryService.findByCredentials({
        email: userDto.email,
        password: userDto.password,
      });
      await this.userRepository.save({ ...user, verifyId });
      await this.mailService.send({
        from: process.env.MAILGUN_SENDER_EMAIL,
        to: userDto.email,
        subject: 'Email verification',
        html: messageHTML(`${EMAIL_VERIFICATION}/${verifyId}`),
      });
      return `Confirmation sent to email: ${userDto.email}`;
    } catch (error) {
      throw new BadRequestException(error.message, error);
    }
  }

  async changePassword({
    passwordData,
    email,
  }: {
    passwordData: ChangePasswordDto;
    email: string;
  }): Promise<User> {
    const user: User = await this.usersQueryService.findByCredentials({
      email,
      password: passwordData.oldPassword,
    });

    if (!user) {
      throw new NotFoundException('Old password is incorrect.');
    }

    user.password = passwordData.newPassword;
    await this.userRepository.save(user);

    return this.getMe(email);
  }

  async changeName(id: number, name: string) {
    await this.userRepository.update(id, { name });
    return this.findById(id);
  }

  async generateTwoFactorSecret({
    userId,
  }: {
    userId: number;
  }): Promise<{ secret: string; qrcode: string }> {
    try {
      const user = await this.findById(userId);

      if (user.twoFactorAuthEnabled) {
        throw new Error('Two-factor auth already enabled.');
      }

      const twoFactorSecret: TwoFactorSecret = this.twoFactorAuthService.generateSecret(
        `Astra(${user.email})`,
      );

      await this.userRepository.save({
        ...user,
        twoFactorSecret: twoFactorSecret.base32,
      });

      return {
        secret: twoFactorSecret.base32,
        qrcode: twoFactorSecret.otpauth_url,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async enableTwoFactorAuth(dto: TwoFactorAuthDto): Promise<Boolean> {
    try {
      const user: User = await this.usersQueryService.findByCredentials({
        email: dto.email,
        password: dto.password,
      });

      if (!user) {
        throw new Error('Email or password is incorrect.');
      }

      if (user.twoFactorAuthEnabled) {
        throw new Error('Two-factor auth already enabled.');
      }

      const secretIsValid = this.twoFactorAuthService.verifySecret({
        secret: user.twoFactorSecret,
        code: dto.code,
      });

      if (!secretIsValid) {
        throw new Error('Two-factor code is wrong.');
      }

      await this.userRepository.save({
        ...user,
        twoFactorSecret: user.twoFactorSecret,
        twoFactorAuthEnabled: true,
      });

      return secretIsValid;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async disableTwoFactorAuth({ userId, code }: { userId: number; code: number }): Promise<Boolean> {
    try {
      const user = await this.findById(userId);

      if (!user.twoFactorAuthEnabled) {
        throw new Error('Two-factor auth is not enabled.');
      }

      const secretIsValid = this.twoFactorAuthService.verifySecret({
        secret: user.twoFactorSecret,
        code,
      });

      if (!secretIsValid) {
        throw new Error('Two-factor code is wrong.');
      }

      await this.userRepository.save({
        ...user,
        twoFactorSecret: '',
        twoFactorAuthEnabled: false,
      });

      return secretIsValid;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async confirmUserEmail(verifyId): Promise<void> {
    try {
      const user = await this.userRepository.findOne(verifyId);

      if (user.signUpConfirmed) {
        throw new Error('Email is already verified');
      }

      await this.userRepository.update(user.id, { signUpConfirmed: true });
      delete user.twoFactorSecret;
      delete user.signUpConfirmed;

      await this.mailService.send({
        from: process.env.MAILGUN_SENDER_EMAIL,
        to: user.email,
        subject: 'Successful registration!',
        html: emailRegistration(user.email),
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
