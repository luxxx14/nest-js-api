import { IsDefined, IsIn, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PaymentTypes } from '../../types';
import { PAYMENT_TYPES } from '../../constants';

export class RequestWithdrawalDto {
  @ApiModelProperty()
  @IsIn(Object.values(PAYMENT_TYPES))
  withdrawalType: PaymentTypes;

  @ApiModelProperty()
  @IsDefined({ message: 'withdrawal is required' })
  @IsNumber()
  @IsPositive()
  withdrawalValue: number;

  @ApiModelProperty({ minLength: 3, maxLength: 3 })
  @IsDefined({ message: 'withdrawalCurrencyCode is required' })
  @IsString()
  withdrawalCurrencyCode: string;
}
