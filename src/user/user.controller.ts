import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UserService } from './user.service';

@Controller('account')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }
}
