import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCreditDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'client id',
    example: '57b2a6bc60d14e45ac81bb6b8205da0f',
  })
  xref: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the destination bank code', example: '044' })
  bank_code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'the destination account number',
    example: '0006638936',
  })
  account_number: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'the amount to transsfer formatted to 2 decimal places',
    example: 1500.0,
  })
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'a text that will be attached to the transaction',
    example: 'INVOICE 1005',
  })
  narration: string;
}
