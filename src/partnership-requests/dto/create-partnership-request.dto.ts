import { IsDefined, IsString, Length, IsIn, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PartnershipRequestsStatuses } from '../../types';
import { PARTNERSHIPS_REQUESTS_STATUSES } from '../../constants';

export class CreatePartnershipRequestDto {
  @ApiModelProperty()
  @IsIn(Object.values(PARTNERSHIPS_REQUESTS_STATUSES))
  status: PartnershipRequestsStatuses;

  @ApiModelProperty()
  @IsDefined({ message: 'email is required' })
  @IsString()
  @IsEmail()
  @Length(0, 256)
  email: string;

  @ApiModelProperty()
  @IsDefined({ message: 'name is required' })
  @IsString()
  @Length(0, 512)
  name: string;

  @ApiModelProperty()
  @IsDefined({ message: 'phoneNumber is required' })
  @IsString()
  phoneNumber: string;
}
