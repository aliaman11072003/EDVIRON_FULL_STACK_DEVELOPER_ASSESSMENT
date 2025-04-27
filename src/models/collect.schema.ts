import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Collect extends Document {
  @Prop({ required: true })
  school_id: Types.ObjectId;

  @Prop({
    type: {
      name: { type: String, required: true },
      id: { type: String, required: true },
      email: { type: String, required: true },
    },
    required: true,
  })
  student_info: {
    name: string;
    id: string;
    email: string;
  };

  @Prop({
    type: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    required: true,
  })
  trustee_info: {
    name: string;
    email: string;
    phone: string;
  };
}

export const CollectSchema = SchemaFactory.createForClass(Collect); 