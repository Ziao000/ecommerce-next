import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderCreateDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
