import { OrderWorkout } from '@backend/shared-types';
import { Expose, Transform } from 'class-transformer';
import { CreatedWorkoutRdo } from './created-workout.rdo';

export class CoachWorkoutOrdersRdo extends CreatedWorkoutRdo {
  @Expose()
  @Transform(({value}) => (
      value
        .reduce(
          (prev: Record<string, unknown>, order: Pick<OrderWorkout, 'sum' | 'amountWorkout'>) =>
            ({...prev, ...order}), {}
        )
    )
  )
  public orders: OrderWorkout[];
}
