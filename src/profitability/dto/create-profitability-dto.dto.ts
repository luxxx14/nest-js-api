import { IsDefined, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProfitability {
  @ApiModelProperty()
  @IsDefined({ message: 'value is required' })
  @IsNumber()
  value: number;
}
