import { TrainingTime, User, UserCustomer, UserExperience, UserSpecialization } from '@backend/shared-types';
import { UserEntity } from './user.entity';

export class UserCustomerEntity extends UserEntity {
  public experience?: UserExperience;
  public specializations?: UserSpecialization[];
  public trainingTime?: TrainingTime;
  public certificates?: string[];
  public achievement?: string;
  public isIndividualTraining?: boolean;
  public targetReduceСalories?: number;
  public dayReduceCalories?: number;
  public isReadyTraining?: boolean;

  constructor(user: User) {
    super(user);
  }

  public updateEntity(user: UserCustomer) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.password = user.password;
    this.sex = user.sex;
    this.dateBirth = user.dateBirth;
    this.role = user.role;
    this.location = user.location;
    this.about = user.about;
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.trainingTime = user.trainingTime;
    this.targetReduceСalories = user.targetReduceСalories;
    this.dayReduceCalories = user.dayReduceCalories;
    this.isReadyTraining = user.isReadyTraining;
  }
}
