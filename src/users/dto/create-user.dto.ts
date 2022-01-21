import { IsString, Length, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiModelProperty({ minLength: 0, maxLength: 512 })
  @IsDefined({ message: 'name is required' })
  @Length(0, 512)
  @IsString()
  readonly name: string;

  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'email is required' })
  @IsString()
  @Length(0, 254)
  @Transform((value) => value.toLowerCase())
  readonly email: string;

  @ApiModelProperty({ minLength: 0, maxLength: 254 })
  @IsDefined({ message: 'password is required' })
  @Length(0, 254)
  @IsString()
  readonly password: string;
}
