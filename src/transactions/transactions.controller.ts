import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTransactions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.transactionsService.getAllTransactions(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('school/:schoolId')
  async getTransactionsBySchool(
    @Param('schoolId') schoolId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.transactionsService.getTransactionsBySchool(schoolId, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:customOrderId')
  async getTransactionStatus(@Param('customOrderId') customOrderId: string) {
    return this.transactionsService.getTransactionStatus(customOrderId);
  }
} 