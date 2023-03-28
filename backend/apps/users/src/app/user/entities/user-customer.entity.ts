import {
  TrainingTime,
  UserCustomer,
  UserExperience,
  UserSpecialization,
} from '@backend/shared-types';
import { UserEntity } from './user.entity';

export class UserCustomerEntity extends UserEntity {
  public experience?: UserExperience;
  public specializations?: UserSpecialization[];
  public trainingTime?: TrainingTime;
  public targetDeclineСalories?: number;
  public dayDeclineCalories?: number;
  public isReadyTraining?: boolean;

  constructor(user: UserCustomer) {
    super(user);
    this.fillRoleEntity(user);
  }

  public updateEntity(user: UserCustomer) {
    this._id = user._id;
    this.name = user.name;
    this.avatar = user.avatar;
    this.sex = user.sex;
    this.dateBirth = user.dateBirth;
    this.location = user.location;
    this.about = user.about;
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.trainingTime = user.trainingTime;
    this.targetDeclineСalories = user.targetDeclineСalories;
    this.dayDeclineCalories = user.dayDeclineCalories;
    this.isReadyTraining = user.isReadyTraining;
  }

  public addInfoEntity(user: UserCustomer) {
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.trainingTime = user.trainingTime;
    this.targetDeclineСalories = user.targetDeclineСalories;
    this.dayDeclineCalories = user.dayDeclineCalories;
    this.isReadyTraining = user.isReadyTraining;
  }

  public fillRoleEntity(user: UserCustomer) {
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.trainingTime = user.trainingTime;
    this.targetDeclineСalories = user.targetDeclineСalories;
    this.dayDeclineCalories = user.dayDeclineCalories;
    this.isReadyTraining = user.isReadyTraining;
  }
}
