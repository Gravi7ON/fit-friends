import { getRandomPositiveInteger } from '@backend/core';

enum RangeImages {
  Min = 1,
  Max = 4
}


export const RANDOM_STATIC_IMAGE_PATH = `http://localhost:${process.env.PORT}/api/files/training-${getRandomPositiveInteger(RangeImages.Min, RangeImages.Max)}.jpg`

export enum WorkoutMessageException {
  OnlyCoach = 'Users with role coach only'
}
