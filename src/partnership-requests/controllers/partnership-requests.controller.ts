import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { PartnershipRequestsCrudService } from '../services';
import { CreatePartnershipRequestDto } from '../dto';

@Controller('partnership-requests')
@ApiUseTags('Partnership Requests')
export class PartnershipRequestsController {
  constructor(private readonly crudService: PartnershipRequestsCrudService) {}

  @Post()
  @ApiOperation({ title: 'Request partnership' })
  async create(@Body() dto: CreatePartnershipRequestDto) {
    return this.crudService.create(dto);
  }
}
