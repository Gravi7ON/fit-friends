import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tokens',
  timestamps: true,
})
export class TokenModel extends Document {
  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
