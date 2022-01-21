import { IsIn, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ContractsStatuses, PaymentTypes } from '../../types';
import { CONTRACTS_STATUSES, PAYMENT_TYPES } from '../../constants';

export class UpdateContractDto {
  @ApiModelProperty()
  @IsString()
  contactEmail: string;

  @ApiModelProperty()
  @IsNumber()
  rate: number;

  @ApiModelProperty()
  @IsIn(Object.values(CONTRACTS_STATUSES))
  status: ContractsStatuses;

  @ApiModelProperty()
  @IsIn(Object.values(PAYMENT_TYPES))
  paymentType: PaymentTypes;

  @ApiModelProperty({ minLength: 3, maxLength: 3 })
  @IsString()
  paymentCurrencyCode: string;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  paymentValue: number;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  contractsPlanId: number;
}