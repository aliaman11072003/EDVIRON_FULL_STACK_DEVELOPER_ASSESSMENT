import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true })
  order_id: Types.ObjectId;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  gateway: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction); 