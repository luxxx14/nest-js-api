import { IsDefined, IsString, Length, IsPositive, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SignInUserDto {
  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'email is required' })
  @IsString()
  @Length(0, 254)
  @Transform((value) => value.toLowerCase())
  email: string;

  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'password is required' })
  @IsString()
  @Length(0, 254)
  password: string;

  @ApiModelProperty()
  @IsPositive()
  @IsNumber()
  code: number;
}
