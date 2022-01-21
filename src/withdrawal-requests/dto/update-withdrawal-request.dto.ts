import { IsIn, IsString, IsNumber, IsPositive, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PaymentTypes, WithdrawalRequestsStatuses } from '../../types';
import { PAYMENT_TYPES, WITHDRAWAL_REQUESTS_STATUSES } from '../../constants';

export class UpdateWithdrawalRequestDto {
  @ApiModelProperty()
  @IsIn(Object.values(PAYMENT_TYPES))
  withdrawalType: PaymentTypes;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  withdrawalValue: number;

  @ApiModelProperty({ minLength: 3, maxLength: 3 })
  @Length(3, 3)
  @IsString()
  withdrawalCurrencyCode: string;

  @ApiModelProperty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiModelProperty()
  @IsIn(Object.values(WITHDRAWAL_REQUESTS_STATUSES))
  status: WithdrawalRequestsStatuses;
}
