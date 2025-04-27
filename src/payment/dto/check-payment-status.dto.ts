import { IsString, IsNotEmpty } from 'class-validator';

export class CheckPaymentStatusDto {
  @IsString()
  @IsNotEmpty()
  collectRequestId: string;
} 