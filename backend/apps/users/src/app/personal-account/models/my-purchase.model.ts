import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  collection: 'my-purchases',
  timestamps: true,
})
export class MyPurchaseModel extends Document {
  @Prop({
    required: true,
  })
  public purchasedWorkoutIds: number[];

  @Prop({
    required: true,
  })
  public purchasedGymIds: number[];

  @Prop({
    required: true,
  })
  public userId: string;
}

export const MyPurchaseSchema = SchemaFactory.createForClass(MyPurchaseModel);
