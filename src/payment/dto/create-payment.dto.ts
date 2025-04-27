import { IsString, IsNumber, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StudentInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  school_id: string;

  @IsString()
  @IsNotEmpty()
  trustee_id: string;

  @ValidateNested()
  @Type(() => StudentInfoDto)
  student_info: StudentInfoDto;

  @IsString()
  @IsNotEmpty()
  gateway_name: string;

  @IsNumber()
  @IsNotEmpty()
  order_amount: number;
} 