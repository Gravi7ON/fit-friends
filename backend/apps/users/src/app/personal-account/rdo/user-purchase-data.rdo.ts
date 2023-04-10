import { Workout } from '@backend/shared-types';
import { Gym } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class UserPurchaseDataRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose({ name: 'purchasedGymIds' })
  public purchasedGyms: Gym[];

  @Expose({ name: 'purchasedWorkoutIds' })
  public purchasedWorkouts: Workout[];

  @Expose()
  @Transform(({ obj }) => obj.purchasedWorkoutIds.length)
  public amountWorkouts: number;

  @Expose()
  @Transform(({ obj }) => obj.purchasedGymIds.length)
  public amountGyms: number;

  @Expose()
  public userId: string;
}
