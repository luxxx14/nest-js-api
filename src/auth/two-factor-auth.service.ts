import * as speakeasy from 'speakeasy';

import { TwoFactorSecret } from './interfaces';

export class TwoFactorAuthService {
  generateSecret(label: string): TwoFactorSecret {
    const secret: TwoFactorSecret = speakeasy.generateSecret({ length: 20 });
    const otpauth_url: string = speakeasy.otpauthURL({
      secret: secret.ascii,
      label,
    });

    return {
      ...secret,
      otpauth_url,
    };
  }

  verifySecret({ secret, code }: { secret: string; code: number }): Boolean {
    return speakeasy.totp.verify({
      encoding: 'base32',
      secret,
      token: code,
    });
  }
}
