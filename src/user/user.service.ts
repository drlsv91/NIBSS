import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly walletService: WalletService,
  ) {}

  async create(userData: CreateUserDto) {
    const user = this.repo.create(userData);

    const createdUser = await this.repo.save(user);

    const wallet = this.walletService.create(createdUser);

    return wallet;
  }
  getOne(id: string) {
    return this.walletService.getAccount(id);
  }
}
