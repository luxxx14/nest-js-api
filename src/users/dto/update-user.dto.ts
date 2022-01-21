import { IsString, Length, IsDefined, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiModelProperty({ minLength: 0, maxLength: 512 })
  @IsString()
  @Length(0, 512)
  readonly name: string;

  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsString()
  @Length(0, 254)
  @Transform((value) => value.toLowerCase())
  readonly email: string;

  @ApiModelProperty()
  @IsBoolean()
  readonly twoFactorAuthEnabled: boolean;
}
