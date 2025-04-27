import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../models/order.schema';
import { OrderStatus } from '../models/order-status.schema';
import { WebhookLogs } from '../models/webhook-logs.schema';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PaymentService {
  private readonly EDVIRON_API_URL = process.env.EDVIRON_API_URL;
  private readonly EDVIRON_API_KEY = process.env.EDVIRON_API_KEY;
  private readonly EDVIRON_PG_KEY = process.env.EDVIRON_PG_KEY;
  private readonly SCHOOL_ID = process.env.SCHOOL_ID;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>,
    @InjectModel(WebhookLogs.name) private webhookLogsModel: Model<WebhookLogs>,
  ) {
    // Validate required environment variables
    if (!this.EDVIRON_API_URL || !this.EDVIRON_API_KEY || !this.EDVIRON_PG_KEY || !this.SCHOOL_ID) {
      throw new Error('Missing required environment variables for payment service');
    }
  }

  private generateSign(payload: any): string {
    return jwt.sign(payload, this.EDVIRON_PG_KEY);
  }

  async createPayment(orderData: {
    school_id: string;
    trustee_id: string;
    student_info: {
      name: string;
      id: string;
      email: string;
    };
    gateway_name: string;
    order_amount: number;
  }) {
    try {
      // Create order
      const order = new this.orderModel({
        school_id: orderData.school_id,
        trustee_id: orderData.trustee_id,
        student_info: orderData.student_info,
        gateway_name: orderData.gateway_name,
      });
      await order.save();

      // Prepare payment request
      const callbackUrl = `${process.env.APP_URL}/payment/webhook`;
      const signPayload = {
        school_id: this.SCHOOL_ID,
        amount: orderData.order_amount.toString(),
        callback_url: callbackUrl,
      };

      const sign = this.generateSign(signPayload);

      // Call Edviron payment API
      const response = await axios.post(
        `${this.EDVIRON_API_URL}/create-collect-request`,
        {
          school_id: this.SCHOOL_ID,
          amount: orderData.order_amount.toString(),
          callback_url: callbackUrl,
          sign,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.EDVIRON_API_KEY}`,
          },
        }
      );

      // Create order status
      const orderStatus = new this.orderStatusModel({
        collect_id: order._id,
        order_amount: orderData.order_amount,
        transaction_amount: 0, // Will be updated via webhook
        payment_mode: 'PENDING',
        payment_details: '',
        bank_reference: '',
        payment_message: 'Payment initiated',
        status: 'PENDING',
        payment_time: new Date(),
      });
      await orderStatus.save();

      return {
        collect_request_id: response.data.collect_request_id,
        collect_request_url: response.data.Collect_request_url,
        order_id: order._id,
      };
    } catch (error) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  async checkPaymentStatus(collectRequestId: string) {
    try {
      const signPayload = {
        school_id: this.SCHOOL_ID,
        collect_request_id: collectRequestId,
      };

      const sign = this.generateSign(signPayload);

      const response = await axios.get(
        `${this.EDVIRON_API_URL}/collect-request/${collectRequestId}`,
        {
          params: {
            school_id: this.SCHOOL_ID,
            sign,
          },
          headers: {
            'Authorization': `Bearer ${this.EDVIRON_API_KEY}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Payment status check failed: ${error.message}`);
    }
  }

  async handleWebhook(payload: any) {
    try {
      // Log webhook data
      const webhookLog = new this.webhookLogsModel({
        status: payload.status,
        order_info: payload.order_info,
      });
      await webhookLog.save();

      const { order_info } = payload;
      
      const orderStatus = await this.orderStatusModel.findOne({
        collect_id: new Types.ObjectId(order_info.order_id),
      });

      if (orderStatus) {
        orderStatus.transaction_amount = order_info.transaction_amount;
        orderStatus.payment_mode = order_info.payment_mode;
        orderStatus.payment_details = order_info.payemnt_details;
        orderStatus.bank_reference = order_info.bank_reference;
        orderStatus.payment_message = order_info.Payment_message;
        orderStatus.status = order_info.status;
        orderStatus.error_message = order_info.error_message;
        orderStatus.payment_time = new Date(order_info.payment_time);
        
        await orderStatus.save();
        return { success: true, message: 'Webhook processed successfully' };
      }
      
      return { success: false, message: 'Order not found' };
    } catch (error) {
      // Log error in webhook logs
      const webhookLog = new this.webhookLogsModel({
        status: 500,
        order_info: payload.order_info,
        error: error.message,
      });
      await webhookLog.save();

      throw new Error(`Webhook processing failed: ${error.message}`);
    }
  }
} 