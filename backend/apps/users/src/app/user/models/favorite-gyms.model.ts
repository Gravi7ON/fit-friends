import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  collection: 'favorite-gyms',
  timestamps: true,
})
export class FavoriteGymsModel extends Document {
  @Prop({
    required: true,
  })
  public favoriteGymId: number;

  @Prop({
    required: true,
  })
  public userId: string;
}

export const FavoriteGymsSchema =
  SchemaFactory.createForClass(FavoriteGymsModel);
