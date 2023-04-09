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
  public purchasedWorkouts: object[];

  @Prop({
    required: true,
  })
  public purchasedGyms: object[];

  @Prop({
    required: true,
  })
  public userId: string;
}

export const MyPurchaseSchema = SchemaFactory.createForClass(MyPurchaseModel);
