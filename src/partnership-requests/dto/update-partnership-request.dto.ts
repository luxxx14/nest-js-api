import { IsDefined, IsString, Length, IsIn, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PartnershipRequestsStatuses } from '../../types';
import { PARTNERSHIPS_REQUESTS_STATUSES } from '../../constants';

export class UpdatePartnershipRequestDto {
  @ApiModelProperty()
  @IsIn(Object.values(PARTNERSHIPS_REQUESTS_STATUSES))
  status: PartnershipRequestsStatuses;

  @ApiModelProperty()
  @IsString()
  @Length(0, 256)
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsString()
  @Length(0, 512)
  name: string;

  @ApiModelProperty()
  @IsString()
  phoneNumber: string;
}
