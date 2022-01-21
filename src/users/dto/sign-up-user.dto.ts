import { IsString, Length, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SignUpUserDto {
  @ApiModelProperty({ minLength: 0, maxLength: 512 })
  @IsDefined({ message: 'name is required' })
  @IsString()
  @Length(0, 512)
  readonly name: string;

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
}
