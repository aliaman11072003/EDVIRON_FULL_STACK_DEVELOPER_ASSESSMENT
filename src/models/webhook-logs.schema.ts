import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WebhookLogs extends Document {
  @Prop({ type: Number, required: true })
  status: number;

  @Prop({
    type: {
      order_id: { type: String, required: true },
      order_amount: { type: Number, required: true },
      transaction_amount: { type: Number, required: true },
      gateway: { type: String, required: true },
      bank_reference: { type: String, required: true },
      status: { type: String, required: true },
      payment_mode: { type: String, required: true },
      payemnt_details: { type: String, required: true },
      Payment_message: { type: String, required: true },
      payment_time: { type: Date, required: true },
      error_message: { type: String, default: 'NA' },
    },
    required: true,
  })
  order_info: {
    order_id: string;
    order_amount: number;
    transaction_amount: number;
    gateway: string;
    bank_reference: string;
    status: string;
    payment_mode: string;
    payemnt_details: string;
    Payment_message: string;
    payment_time: Date;
    error_message: string;
  };

  @Prop({ type: String })
  error: string;
}

export const WebhookLogsSchema = SchemaFactory.createForClass(WebhookLogs); 