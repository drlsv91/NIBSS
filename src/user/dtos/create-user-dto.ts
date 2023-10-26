import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'first name', example: 'New User' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'last name', example: 'New User' })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'phone number', example: '09038872804' })
  phone: string;
}
