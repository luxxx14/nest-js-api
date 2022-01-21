import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateProfitability {
  @ApiModelProperty()
  @IsNumber()
  value: number;
}

