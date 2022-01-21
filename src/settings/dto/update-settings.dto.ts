import { IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  btcPriceUsd: number;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  miningDailyIncome: number;
}
