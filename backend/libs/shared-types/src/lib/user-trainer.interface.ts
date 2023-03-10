import { UserExperience } from './user-experience.enum';
import { UserSpecialization } from './user-specialization.enum';
import { User } from './user.interface';

export interface UserTrainer extends User {
  experience?: UserExperience;
  specializations?: UserSpecialization[];
  certificates?: string[];
  achievement?: string;
  isIndividualTraining?: boolean;
}
