import { IsDefined, IsString, Length, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class TwoFactorAuthDto {
  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'email is required' })
  @IsString()
  @Length(0, 254)
  @Transform((value) => value.toLowerCase())
  readonly email: string;

  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'password is required' })
  @IsString()
  @Length(0, 254)
  readonly password: string;

  @ApiModelProperty()
  @IsDefined({ message: 'code token is required' })
  @IsPositive()
  @IsNumber()
  readonly code: number;
}
