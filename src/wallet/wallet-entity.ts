import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user_id: string;

  @Column()
  account_name: string;
  @Column()
  account_number: string;
  @Column()
  account_balance: number;
  @Column()
  kyc: number;
}
