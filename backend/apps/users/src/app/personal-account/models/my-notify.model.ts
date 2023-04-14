import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'my-notify',
  timestamps: true,
})
export class MyNotifyModel extends Document {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public textNotify: string;
}

export const MyNotifySchema = SchemaFactory.createForClass(MyNotifyModel);
