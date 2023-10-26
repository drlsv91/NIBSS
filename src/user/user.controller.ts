import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UserService } from './user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateCreditDto } from 'src/transaction/dtos/credit-request-dto';

@Controller('account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  @Post('/create')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Post('/:id/transfer')
  transfer(@Param('id') id: string, @Body() body: CreateCreditDto) {
    return this.walletService.transfer(id, body);
  }

  @Post('/:id/credit')
  credit(@Param('id') id: string, @Body() body: CreateCreditDto) {
    return this.walletService.credit(id, body);
  }
}
