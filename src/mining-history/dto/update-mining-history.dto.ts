import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateMiningHistory {
  @ApiModelProperty()
  @IsNumber()
  profit: number;

  @ApiModelProperty()
  @IsNumber()
  bonus: number;

  @ApiModelProperty()
  @IsNumber()
  mining: number;
}
