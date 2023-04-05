import { WeekWorkoutDiary } from '@backend/shared-types';
import { Expose, Transform } from 'class-transformer';

export class UserWeekWorkoutDiaryRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public year: string;

  @Expose()
  public weekOfYear: string;

  @Expose()
  public userId: string;

  @Expose()
  public diary: Record<
    string,
    Pick<WeekWorkoutDiary, 'calory' | 'date' | 'trainingTime' | 'workoutId'>[]
  >;
}
