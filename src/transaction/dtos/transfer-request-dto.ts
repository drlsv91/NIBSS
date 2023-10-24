import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum TransferType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export class CreateTransferRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'client id',
    example: '57b2a6bc60d14e45ac81bb6b8205da0f',
  })
  xref: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the source bank code', example: '1022' })
  source_bank: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the source bank name', example: 'WASIU AYINDE' })
  source_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the source account', example: '08124661601' })
  source_account: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the destination bank code', example: '044' })
  destination_bank: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'the destination account number',
    example: '0006638936',
  })
  destination_account: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'the destination bank name',
    example: 'ABASS AKANDE',
  })
  destination_name: string;

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

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: 'the transaction date',
    example: '2020-04-20T11:23:20.249Z',
  })
  timestamp: string;

  @IsNotEmpty()
  @IsEnum(['debit', 'credit'])
  @ApiProperty({
    description: 'the transaction date',
    example: '2020-04-20T11:23:20.249Z',
  })
  type: TransferType;
}
