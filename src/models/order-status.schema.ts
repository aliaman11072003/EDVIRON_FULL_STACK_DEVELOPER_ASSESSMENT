import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OrderStatus extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true, index: true })
  collect_id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  order_amount: number;

  @Prop({ type: Number, required: true })
  transaction_amount: number;

  @Prop({ type: String, required: true })
  payment_mode: string;

  @Prop({ type: String, required: true })
  payment_details: string;

  @Prop({ type: String, required: true })
  bank_reference: string;

  @Prop({ type: String, required: true })
  payment_message: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, default: null })
  error_message: string;

  @Prop({ type: Date, required: true })
  payment_time: Date;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);

// Add indexes for frequently queried fields
OrderStatusSchema.index({ status: 1 });
OrderStatusSchema.index({ payment_time: -1 });
OrderStatusSchema.index({ bank_reference: 1 }); 