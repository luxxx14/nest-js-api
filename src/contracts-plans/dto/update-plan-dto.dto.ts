import { IsIn, IsString, IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ContractsPlansPeriod } from '../../types';
import { CONTRACTS_PLANS_PERIOD } from '../../constants';

export class UpdatePlanDto {
  @ApiModelProperty()
  @IsBoolean()
  published: boolean;

  @ApiModelProperty()
  @IsBoolean()
  available: boolean;

  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsNumber()
  minRate: number;

  @ApiModelProperty()
  @IsNumber()
  maxRate: number;

  @ApiModelProperty()
  @IsString()
  maint: string;

  @ApiModelProperty()
  @IsIn(Object.values(CONTRACTS_PLANS_PERIOD))
  period: ContractsPlansPeriod;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  periodValue: number;

  @ApiModelProperty()
  @IsNumber()
  tHsPrice: number;
}
