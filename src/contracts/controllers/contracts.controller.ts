import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ContractsService } from '../services';
import { User } from '../../users/user.entity';
import { SignContractDto } from '../dto';

@Controller('contracts')
@ApiUseTags('Contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @ApiOperation({ title: 'Sign contract' })
  @UseGuards(AuthGuard())
  async signContract(@Req() { user }: { user: User }, @Body() contractDto: SignContractDto) {
    return this.contractsService.signContract(user.id, contractDto);
  }

  @Post('/test3')
  @ApiOperation({ title: 'test3' })
  @UseGuards(AuthGuard())
  async test3(@Req() { user }: { user: User }) {
      return this.contractsService.test3(user.id);
  }

  @Get()
  @ApiOperation({ title: 'Get user contracts' })
  @UseGuards(AuthGuard())
  async getAll(@Req() { user }: { user: User }) {
    return this.contractsService.getUserContracts(user.contractsIds);
  }

  @Get('/overall')
  @ApiOperation({ title: 'Get overall hash rate' })
  @UseGuards(AuthGuard())
  async getOverallHashRate() {
    return this.contractsService.getOverallHashRate();
  }
}
