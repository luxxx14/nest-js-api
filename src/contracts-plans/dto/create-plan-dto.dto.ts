import { IsDefined, IsIn, IsString, IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ContractsPlansPeriod } from '../../types';
import { CONTRACTS_PLANS_PERIOD } from '../../constants';

export class CreatePlanDto {
  @ApiModelProperty()
  @IsBoolean()
  published: boolean;

  @ApiModelProperty()
  @IsBoolean()
  available: boolean;

  @ApiModelProperty()
  @IsDefined({ message: 'name is required' })
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsDefined({ message: 'description is required' })
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsDefined({ message: 'minRate is required' })
  @IsNumber()
  minRate: number;

  @ApiModelProperty()
  @IsDefined({ message: 'minRate is required' })
  @IsNumber()
  maxRate: number;

  @ApiModelProperty()
  @IsDefined({ message: 'maint is required' })
  @IsString()
  maint: string;

  @ApiModelProperty()
  @IsDefined({ message: 'period is required' })
  @IsIn(Object.values(CONTRACTS_PLANS_PERIOD))
  period: ContractsPlansPeriod;

  @ApiModelProperty()
  @IsDefined({ message: 'periodValue is required' })
  @IsNumber()
  @IsPositive()
  periodValue: number;

  @ApiModelProperty()
  @IsDefined({ message: 'tHsPrice is required' })
  @IsNumber()
  tHsPrice: number;
}
