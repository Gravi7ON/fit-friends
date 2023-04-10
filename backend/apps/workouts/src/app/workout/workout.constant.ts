import { getRandomPositiveInteger } from '@backend/core';

enum RangeImages {
  Min = 1,
  Max = 4,
}

export const RANDOM_STATIC_IMAGE_PATH = `http://localhost:${
  process.env.PORT
}/api/files/workouts/training-${getRandomPositiveInteger(
  RangeImages.Min,
  RangeImages.Max
)}.jpg`;

export enum WorkoutMessageException {
  NotFound = 'Workout with this id not found',
  NotFoundGym = 'Gym with this id not found',
  OnlyCoach = 'Users with role coach only create workout',
  OnlyCustomer = 'Users with role customer only create order',
  OnlyOwnWorkout = 'You may edit own workout only',
  NotAnyWorkout = `You don't have any workout yet`,
  NotConvertToNumber = 'Incorrect workout ids',
}

export enum SortingDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum DefaultCoachQuery {
  Limit = 50,
  SortDirection = 'desc',
}

export enum DefaultWorkoutQuery {
  Limit = 50,
  SortDirection = 'desc',
}

export enum DefaultGymQuery {
  Limit = 50,
  SortDirection = 'desc',
}

export enum SortFiled {
  Sum = 'sum',
  AmountWorkout = 'amountWorkout',
}
