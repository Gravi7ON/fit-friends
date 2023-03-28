import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'my-friends',
  timestamps: true,
})
export class MyFriendsModel extends Document {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public friendId: string;
}

export const MyFriendsSchema = SchemaFactory.createForClass(MyFriendsModel);
