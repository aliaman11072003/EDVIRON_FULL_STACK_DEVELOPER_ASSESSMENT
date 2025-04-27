import { Controller, Post, Body, UseGuards, Get, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CheckPaymentStatusDto } from './dto/check-payment-status.dto';
import { WebhookDto } from './dto/webhook.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPayment(@Body() orderData: CreatePaymentDto) {
    try {
      return await this.paymentService.createPayment(orderData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Payment creation failed',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:collectRequestId')
  async checkPaymentStatus(
    @Param() params: CheckPaymentStatusDto,
  ) {
    try {
      return await this.paymentService.checkPaymentStatus(params.collectRequestId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Payment status check failed',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: WebhookDto) {
    try {
      return await this.paymentService.handleWebhook(payload);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Webhook processing failed',
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
} 