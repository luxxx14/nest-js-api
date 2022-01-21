import { IsDefined, IsIn, IsString, IsBoolean, IsNumber, IsPositive, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ContractsStatuses, PaymentTypes } from '../../types';
import { CONTRACTS_STATUSES, PAYMENT_TYPES } from '../../constants';

export class CreateContractDto {
  @ApiModelProperty()
  @IsDefined({ message: 'contactEmail is required' })
  @IsString()
  contactEmail: string;

  @ApiModelProperty()
  @IsDefined({ message: 'rate is required' })
  @IsNumber()
  rate: number;

  @ApiModelProperty()
  @IsIn(Object.values(CONTRACTS_STATUSES))
  status: ContractsStatuses;

  @ApiModelProperty()
  @IsIn(Object.values(PAYMENT_TYPES))
  paymentType: PaymentTypes;

  @ApiModelProperty()
  @IsDefined({ message: 'paymentValue is required' })
  @IsNumber()
  @IsPositive()
  paymentValue: number;

  @ApiModelProperty({ minLength: 3, maxLength: 3 })
  @IsDefined({ message: 'paymentCurrencyCode is required' })
  @Length(3, 3)
  @IsString()
  paymentCurrencyCode: string;

  @ApiModelProperty()
  @IsDefined({ message: 'userId is required' })
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiModelProperty()
  @IsDefined({ message: 'contractsPlanId is required' })
  @IsNumber()
  @IsPositive()
  contractsPlanId: number;

}
