import { IsDefined, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMiningHistory {
  @ApiModelProperty()
  @IsDefined({ message: 'contractId is required' })
  @IsNumber()
  contractId: number;

  @ApiModelProperty()
  @IsDefined({ message: 'profit is required' })
  @IsNumber()
  profit: number;

  @ApiModelProperty()
  @IsDefined({ message: 'bonus is required' })
  @IsNumber()
  bonus: number;

  @ApiModelProperty()
  @IsDefined({ message: 'mining is required' })
  @IsNumber()
  mining: number;
}
