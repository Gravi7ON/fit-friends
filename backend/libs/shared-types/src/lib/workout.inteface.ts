import { UserSpecialization } from './user-specialization.enum';
import { UserExperience } from './user-experience.enum';
import { TrainingTime } from './user-training-time.enum';
import { UserSexForWorkout } from './user-sex-for-workout.enum';
import { OrderWorkout } from './order-workout.interface';
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
  orders?: OrderWorkout[];
}
