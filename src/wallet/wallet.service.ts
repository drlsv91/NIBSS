import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet-entity';
import { User } from 'src/user/user.entity';
import { CreateCreditDto } from '../transaction/dtos/credit-request-dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateTransferRequestDto } from 'src/transaction/dtos/transfer-request-dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private readonly repo: Repository<Wallet>,
    private readonly transactionService: TransactionService,
  ) {}
  create(user: User) {
    const walletData: Partial<Wallet> = {
      account_balance: 0,
      account_name: `${user.last_name} ${user.first_name}`,
      account_number: this.generateNumber(user.phone),
      kyc: this.getKycNumber(user),
      user_id: user.id,
      code: `04${user.phone[2]}`,
    };

    const wallet = this.repo.create(walletData);
    return this.repo.save(wallet);
  }

  getAccount(id: string) {
    return this.repo.findOne({ where: { id } });
  }
  getBank(accountNumber: string, code: string) {
    console.log(code);
    return this.repo.findOne({ where: { account_number: accountNumber } });
  }

  async transfer(id: string, payload: CreateCreditDto) {
    const targetWallet = await this.repo.findOne({ where: { id } });

    if (!targetWallet) throw new NotFoundException('Bank not found');

    const sourceWallet = await this.getBank(
      payload.account_number,
      payload.bank_code,
    );

    if (!sourceWallet) throw new NotFoundException('bank not found');

    const banks = await this.doTransfer(
      sourceWallet,
      targetWallet,
      payload.amount,
    );

    return this.transactionService.transfer(
      banks.source_bank,
      banks.target_bank,
      {
        amount: payload.amount,
        ref: payload.xref,
        fee: this.getFee(payload.amount),
      },
    );
  }
  async credit(id: string, payload: CreateCreditDto) {
    const targetWallet = await this.repo.findOne({ where: { id } });

    if (!targetWallet) throw new NotFoundException('Bank not found');

    const balance = Number(targetWallet.account_balance) + payload.amount;

    targetWallet.account_balance = balance;

    await this.repo.save(targetWallet);

    return this.transactionService.transfer(targetWallet, targetWallet, {
      amount: payload.amount,
      ref: payload.xref,
      fee: this.getFee(payload.amount),
    });
  }

  async bulkTransfer(payload: CreateTransferRequestDto) {
    const sourceBank = await this.getBank(
      payload.source_account,
      payload.source_bank,
    );

    if (!sourceBank) throw new NotFoundException('INVALID_ACCOUNT');

    if (sourceBank.account_balance < payload.amount) {
      throw new NotAcceptableException('Insufficient balance');
    }
    const targetBank = await this.getBank(
      payload.destination_account,
      payload.destination_bank,
    );
    if (!targetBank) throw new NotFoundException('INVALID_ACCOUNT');

    const result = await this.doTransfer(
      sourceBank,
      targetBank,
      payload.amount,
    );

    await this.transactionService.transfer(
      result.source_bank,
      result.target_bank,
      {
        amount: payload.amount,
        ref: payload.xref,
        fee: this.getFee(payload.amount),
      },
    );
  }

  enquiry(bankCode: string, accountNumber: string) {
    return this.repo.findOne({
      where: { account_number: accountNumber, code: bankCode },
    });
  }

  private async doTransfer(
    sourceBank: Wallet,
    targetBank: Wallet,
    amount: number,
  ): Promise<{ source_bank: Wallet; target_bank: Wallet }> {
    const newSourceBalance =
      Number(sourceBank.account_balance) - Number(amount);

    if (newSourceBalance < 0)
      throw new NotAcceptableException('INSUFFICIENT FUNDS');
    const newTargetBalance =
      Number(targetBank.account_balance) + Number(amount);

    sourceBank.account_balance = newSourceBalance;
    targetBank.account_balance = newTargetBalance;
    sourceBank = await this.repo.save(sourceBank);
    targetBank = await this.repo.save(targetBank);

    return { source_bank: sourceBank, target_bank: targetBank };
  }
  private generateNumber(phone: string) {
    return phone.slice(1);
  }

  private getKycNumber(user: Partial<User>): number {
    let number = 0;

    if (user.first_name) number++;
    if (user.last_name) number++;
    if (user.phone) number++;

    return number;
  }

  private getFee(amount: number) {
    return Number(amount) * 0.003;
  }
}
