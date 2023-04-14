import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PersonalTrainingStatus } from '@backend/shared-types';

@Schema({
  collection: 'personal-training',
  timestamps: true,
})
export class PersonalTrainingRequestModel extends Document {
  @Prop({
    required: true,
  })
  public fromUserId: string;

  @Prop({
    required: true,
  })
  public toUserId: string;

  @Prop({
    required: true,
    type: String,
    default: PersonalTrainingStatus.Consideration,
  })
  public requestStatus: PersonalTrainingStatus;
}

export const PersonalTrainingRequestSchema = SchemaFactory.createForClass(
  PersonalTrainingRequestModel
);
