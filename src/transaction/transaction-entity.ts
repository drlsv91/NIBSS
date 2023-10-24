import { User } from 'src/user/user.entity';
import { Wallet } from 'src/wallet/wallet-entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCESS = 'ok',
  ERROR = 'error',
}

export enum TransactionMessage {
  SENT = 'SENT',
  WITHHELD = 'WITHHELD',
  ABANDON = 'ABD',
  PENDING = 'PENDING',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  timestamp: string;
  @Column()
  xref: string;
  @Column()
  @Generated('increment')
  sequence: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({
    type: 'enum',
    enum: TransactionMessage,
    default: TransactionMessage.PENDING,
  })
  message: TransactionMessage;

  @Column({ type: 'numeric' }) // enfornce precision
  amount: number;
  @Column({ type: 'numeric' }) // enfornce precision
  fee: number;

  @Column() // enfornce precision
  account_number: string;
  @Column() // enfornce precision
  account_balance: number;

  @Column() // enfornce precision
  destination_bank_number: string;
  @Column() // enfornce precision
  destination_bank_balance: number;

  @ManyToOne(() => Wallet, { nullable: false })
  wallet_id: string;
  @ManyToOne(() => User, { nullable: true })
  user_id: string;
}
