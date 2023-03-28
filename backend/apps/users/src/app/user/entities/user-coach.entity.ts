import {
  UserExperience,
  UserSpecialization,
  UserCoach,
} from '@backend/shared-types';
import { UserEntity } from './user.entity';

export class UserCoachEntity extends UserEntity {
  public experience?: UserExperience;
  public specializations?: UserSpecialization[];
  public certificates?: string[];
  public achievement?: string;
  public isIndividualTraining?: boolean;

  constructor(user: UserCoach) {
    super(user);
    this.fillRoleEntity(user);
  }

  public updateEntity(user: UserCoach) {
    this._id = user._id;
    this.name = user.name;
    this.avatar = user.avatar;
    this.sex = user.sex;
    this.dateBirth = user.dateBirth;
    this.location = user.location;
    this.about = user.about;
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.achievement = user.achievement;
    this.isIndividualTraining = user.isIndividualTraining;
  }

  public addInfoEntity(user: UserCoach) {
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.achievement = user.achievement;
    this.isIndividualTraining = user.isIndividualTraining;
  }

  public fillRoleEntity(user: UserCoach) {
    this.experience = user.experience;
    this.specializations = user.specializations;
    this.certificates = user.certificates;
    this.achievement = user.achievement;
    this.isIndividualTraining = user.isIndividualTraining;
  }
}
