import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction-entity';
import { Repository } from 'typeorm';
import { Wallet } from 'src/wallet/wallet-entity';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: Repository<Transaction>,
  ) {}

  create(wallet: Wallet, data: { amount: number; ref: string; fee: number }) {
    const transactionData: Partial<Transaction> = {
      account_number: wallet.account_number,
      amount: data.amount,
      account_balance: wallet.account_balance,
      fee: data.fee,
      xref: data.ref,
      timestamp: new Date().toISOString(),
      wallet_id: wallet.id,
      user_id: wallet.user_id,
    };

    const transaction = this.repo.create(transactionData);
    return this.repo.save(transaction);
  }

  transfer(
    source: Wallet,
    target: Wallet,
    data: { amount: number; ref: string; fee: number },
  ) {
    const transactionData: Partial<Transaction> = {
      account_number: source.account_number,
      amount: data.amount,
      account_balance: source.account_balance,
      fee: data.fee,
      xref: data.ref,
      timestamp: new Date().toISOString(),
      wallet_id: source.id,
      user_id: source.user_id,
      destination_bank_balance: target.account_balance,
      destination_bank_number: target.account_number,
    };

    const transaction = this.repo.create(transactionData);
    return this.repo.save(transaction);
  }

  async getOne(id: string) {
    const transaction = await this.repo.findOne({ where: { id } });

    if (!transaction) throw new NotFoundException('transaction not found');
    return transaction;
  }

  async list(userId: string) {
    return paginate<Transaction>(
      this.repo,
      { page: 1, limit: 10 },
      { user_id: userId },
    );
  }
}
