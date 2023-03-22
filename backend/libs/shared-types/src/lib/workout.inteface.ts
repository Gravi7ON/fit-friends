import { UserSpecialization, UserExperience, TrainingTime, UserSexForWorkout, OrderWorkout } from '@backend/shared-types';
import { Review } from './review.interface';

export interface Workout {
  id?: number;
  title: string;
  backgroundImage?: string;
  experience: UserExperience | string;
  specialization: UserSpecialization | string;
  trainingTime: TrainingTime | string;
  cost: number;
  calories: number;
  description: string;
  sex: UserSexForWorkout | string;
  workoutVideo?: string;
  rating?: number;
  coachId?: string;
  isSpecialOffer?: boolean;
  createdAt?: Date;
  reviews?: Review[];
  orders?: OrderWorkout[]
}
