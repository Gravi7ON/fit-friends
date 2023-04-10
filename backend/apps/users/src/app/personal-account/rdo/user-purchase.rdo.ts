import { Expose, Transform } from 'class-transformer';

export class UserPurchaseRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public purchasedGymIds: number[];

  @Expose()
  public purchasedWorkoutIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.purchasedWorkoutIds.length)
  public amountWorkouts: number;

  @Expose()
  @Transform(({ obj }) => obj.purchasedGymIds.length)
  public amountGyms: number;

  @Expose()
  public userId: string;
}
