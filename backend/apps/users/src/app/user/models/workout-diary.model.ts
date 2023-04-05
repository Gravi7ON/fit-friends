import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WeekWorkoutDiary } from '@backend/shared-types';

export class WorkoutDiary {
  @Prop({
    required: true,
    default: [],
  })
  public monday: WeekWorkoutDiary[];

  @Prop({
    required: true,
    default: [],
  })
  public tuesday: WeekWorkoutDiary[];

  @Prop({
    required: true,
    default: [],
  })
  public wednesday: WeekWorkoutDiary[];

  @Prop({
    required: true,
    default: [],
  })
  public thursday: WeekWorkoutDiary[];

  @Prop({
    required: true,
    default: [],
  })
  public friday: WeekWorkoutDiary[];

  @Prop({
    required: true,
    default: [],
  })
  public saturday: WeekWorkoutDiary[];

  @Prop({
    required: true,
    default: [],
  })
  public sunday: WeekWorkoutDiary[];
}

@Schema({
  collection: 'workout-diary',
  timestamps: true,
})
export class WorkoutDiaryModel extends Document {
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

  @Prop({
    required: true,
    type: WorkoutDiary,
  })
  public diary: WorkoutDiary;
}

export const WorkoutDiarySchema =
  SchemaFactory.createForClass(WorkoutDiaryModel);
