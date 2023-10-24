import { Controller, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('enquiry')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/name')
  enquiry(
    @Query('bank_code') code: string,
    @Query('account_number') number: string,
  ) {
    return this.walletService.enquiry(code, number);
  }
}
