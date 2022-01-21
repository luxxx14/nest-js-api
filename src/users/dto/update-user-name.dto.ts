import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserNameDto {
  @ApiModelProperty({ minLength: 0, maxLength: 512 })
  @IsString()
  @Length(0, 512)
  readonly name: string;
}
