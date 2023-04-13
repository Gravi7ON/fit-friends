import { Document } from 'mongoose';
import { Subscriber } from '@backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'workout-subscriber',
  timestamps: true,
})
export class WorkoutSubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public subscribeCoachId: string;
}

export const WorkoutSubscriberSchema = SchemaFactory.createForClass(
  WorkoutSubscriberModel
);
