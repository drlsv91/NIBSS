import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsController } from './payments/payments.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PaymentsService } from './payments/payments.service';
import { WalletService } from './wallet/wallet.service';
import { TransactionService } from './transaction/transaction.service';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [],
  controllers: [AppController, PaymentsController, UserController, WalletController],
  providers: [AppService, UserService, PaymentsService, WalletService, TransactionService],
})
export class AppModule {}
