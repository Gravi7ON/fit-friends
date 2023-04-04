import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  collection: 'food-diary',
  timestamps: true,
})
export class FoodDiaryModel extends Document {
  @Prop({
    required: true,
  })
  public calories: string[];

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public year: number;

  @Prop({
    required: true,
  })
  public weekOfYear: number;
}

export const FoodDiarySchema = SchemaFactory.createForClass(FoodDiaryModel);
