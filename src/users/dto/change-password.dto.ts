import { IsDefined, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'password is required' })
  @IsString()
  @Length(0, 254)
  readonly oldPassword: string;

  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'password is required' })
  @Length(0, 254)
  @IsString()
  readonly newPassword: string;
}
