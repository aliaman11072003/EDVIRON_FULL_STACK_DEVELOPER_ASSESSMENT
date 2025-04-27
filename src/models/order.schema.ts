import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  collect_id: Types.ObjectId;

  @Prop({ required: true })
  school_id: Types.ObjectId;

  @Prop({ required: true })
  gateway: string;

  @Prop({ required: true })
  order_amount: number;

  @Prop({ required: true })
  custom_order_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order); 