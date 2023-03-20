import { getRandomPositiveInteger } from '@backend/core';

enum RangeImages {
  Min = 1,
  Max = 4
}


export const RANDOM_IMAGE_PATH = `training-${getRandomPositiveInteger(RangeImages.Min, RangeImages.Max)}.jpg`
