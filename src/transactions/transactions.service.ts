import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from '../models/order.schema';
import { Collect } from '../models/collect.schema';
import { Transaction } from '../models/transaction.schema';
import { PipelineStage } from 'mongoose';
import { OrderStatus } from '../models/order-status.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Collect.name) private collectModel: Model<Collect>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>,
  ) {}

  async getAllTransactions(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $lookup: {
          from: 'orderstatuses',
          localField: '_id',
          foreignField: 'collect_id',
          as: 'status'
        }
      },
      { $unwind: '$status' },
      {
        $project: {
          collect_id: '$_id',
          school_id: 1,
          gateway: '$gateway_name',
          order_amount: '$status.order_amount',
          transaction_amount: '$status.transaction_amount',
          status: '$status.status',
          custom_order_id: 1
        }
      },
      { $skip: skip },
      { $limit: limit }
    ];

    return this.orderModel.aggregate(pipeline).exec();
  }

  async getTransactionsBySchool(schoolId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const pipeline = [
      { $match: { school_id: new Types.ObjectId(schoolId) } },
      {
        $lookup: {
          from: 'orderstatuses',
          localField: '_id',
          foreignField: 'collect_id',
          as: 'status'
        }
      },
      { $unwind: '$status' },
      {
        $project: {
          collect_id: '$_id',
          school_id: 1,
          gateway: '$gateway_name',
          order_amount: '$status.order_amount',
          transaction_amount: '$status.transaction_amount',
          status: '$status.status',
          custom_order_id: 1
        }
      },
      { $skip: skip },
      { $limit: limit }
    ];

    return this.orderModel.aggregate(pipeline).exec();
  }

  async getTransactionStatus(customOrderId: string) {
    const pipeline = [
      { $match: { custom_order_id: customOrderId } },
      {
        $lookup: {
          from: 'orderstatuses',
          localField: '_id',
          foreignField: 'collect_id',
          as: 'status'
        }
      },
      { $unwind: '$status' },
      {
        $project: {
          collect_id: '$_id',
          school_id: 1,
          gateway: '$gateway_name',
          order_amount: '$status.order_amount',
          transaction_amount: '$status.transaction_amount',
          status: '$status.status',
          custom_order_id: 1,
          payment_mode: '$status.payment_mode',
          payment_details: '$status.payment_details',
          bank_reference: '$status.bank_reference',
          payment_message: '$status.payment_message',
          error_message: '$status.error_message',
          payment_time: '$status.payment_time'
        }
      }
    ];

    const result = await this.orderModel.aggregate(pipeline).exec();
    return result[0] || null;
  }
} 