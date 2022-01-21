import { Controller, Post, Body, Get, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './services';
import { User } from './user.entity';
import { SignUpUserDto, SignInUserDto, ChangePasswordDto, TwoFactorAuthDto } from './dto';
import { UpdateUserNameDto } from './dto/update-user-name.dto';
import { EmailConfirmedGuard } from '../auth/guards/email.confirmed.guard';

@Controller('users')
@ApiUseTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign-up')
  @ApiOperation({ title: 'Sign up new user' })
  async signUp(@Body() userData: SignUpUserDto) {
    return this.userService.signUp(userData);
  }

  @Post('sign-in')
  @ApiOperation({ title: 'Sign in existing user' })
  @UseGuards(EmailConfirmedGuard)
  async signIn(@Body() userData: SignInUserDto) {
    return this.userService.signIn(userData);
  }

  @Get('me')
  @ApiOperation({ title: `Get user's data` })
  @UseGuards(AuthGuard())
  async getMe(@Req() { user }: { user: User }) {
    return this.userService.getMe(user.email);
  }

  @Patch('name')
  @ApiOperation({ title: 'Update user name' })
  @UseGuards(AuthGuard())
  async updateName(@Req() { user }: { user: User }, @Body() userData: UpdateUserNameDto) {
    return this.userService.changeName(user.id, userData.name);
  }

  @Patch('password')
  @ApiOperation({ title: `Update user password` })
  @UseGuards(AuthGuard())
  async updatePassword(@Body() passwordData: ChangePasswordDto, @Req() { user }: { user: User }) {
    return this.userService.changePassword({ passwordData, email: user.email });
  }

  @Get('two-factor-secret')
  @ApiOperation({ title: `Generate two factor auth secret` })
  @UseGuards(AuthGuard())
  async generateTwoFactorSecret(@Req() { user }: { user: User }) {
    return this.userService.generateTwoFactorSecret({ userId: user.id });
  }

  @Patch('enable-two-factor')
  @ApiOperation({ title: `Enable two factor auth` })
  @UseGuards(AuthGuard())
  async enableTwoFactorAuth(@Body() dto: TwoFactorAuthDto) {
    return this.userService.enableTwoFactorAuth(dto);
  }

  @Patch('disable-two-factor')
  @ApiOperation({ title: `Enable two factor auth` })
  @UseGuards(AuthGuard())
  async disableTwoFactorAuth(@Req() { user }: { user: User }, @Body() { code }: { code: number }) {
    return this.userService.disableTwoFactorAuth({ userId: user.id, code });
  }

  @Get('confirm/:verifyId')
  async confirmUserEmail(@Param() verifyId) {
    this.userService.confirmUserEmail(verifyId);
  }
}
