import { User, UserExperience, UserSpecialization, UserTrainer } from '@backend/shared-types';
import { UserEntity } from './user.entity';

export class UserTrainerEntity extends UserEntity {
  public experience?: UserExperience;
  public specializations?: UserSpecialization[];
  public certificates?: string[];
  public achievement?: string;
  public isIndividualTraining?: boolean;

  constructor(user: User) {
    super(user);
  }

  public updateEntity(user: UserTrainer) {
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
    this.certificates = user.certificates;
    this.achievement = user.achievement;
    this.isIndividualTraining = user.isIndividualTraining;
  }
}
