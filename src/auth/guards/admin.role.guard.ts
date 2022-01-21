import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { USER_ROLES } from '../../constants';

export class AdminRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const role = req.user.role;

    if (role !== USER_ROLES.admin) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
