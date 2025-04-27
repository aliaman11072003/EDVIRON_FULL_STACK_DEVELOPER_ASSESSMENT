import { IsNumber, IsString, IsDate, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderInfoDto {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsNumber()
  @IsNotEmpty()
  order_amount: number;

  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  @IsString()
  @IsNotEmpty()
  gateway: string;

  @IsString()
  @IsNotEmpty()
  bank_reference: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  payment_mode: string;

  @IsString()
  @IsNotEmpty()
  payemnt_details: string;

  @IsString()
  @IsNotEmpty()
  Payment_message: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  payment_time: Date;

  @IsString()
  error_message: string;
}

export class WebhookDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @ValidateNested()
  @Type(() => OrderInfoDto)
  order_info: OrderInfoDto;
} 