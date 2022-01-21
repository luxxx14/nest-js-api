import { AuthToken } from './../../auth/interfaces';
import { User } from '../user.entity';

export interface AuthUser {
  user: User;
  token: AuthToken;
}
