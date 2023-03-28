import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'black-list-tokens',
  timestamps: true,
})
export class BlackListTokenModel extends Document {
  @Prop({
    required: true,
  })
  public refreshToken: string;
}

export const BlackListTokenSchema =
  SchemaFactory.createForClass(BlackListTokenModel);
