import { UserExperience } from './user-experience.enum';
import { UserSpecialization } from './user-specialization.enum';
import { TrainingTime } from './user-training-time.enum';
import { User } from './user.interface';

export interface UserCustomer extends User {
  experience?: UserExperience;
  specializations?: UserSpecialization[];
  trainingTime?: TrainingTime;
  targetDeclineСalories?: number;
  dayDeclineCalories?: number;
  isReadyTraining?: boolean;
}
