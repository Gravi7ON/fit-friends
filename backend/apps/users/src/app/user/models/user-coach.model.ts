import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  UserExperience,
  UserSpecialization,
  UserCoach,
} from '@backend/shared-types';
import { UserModel } from './user-common.model';

@Schema({
  collection: 'users-coach',
  timestamps: true,
})
export class UserCoachModel extends UserModel implements UserCoach {
  constructor() {
    super();
  }

  @Prop({
    default: '',
    type: String,
  })
  public experience?: UserExperience;

  @Prop({
    default: [],
  })
  public specializations?: UserSpecialization[];

  @Prop({
    default: [],
  })
  public certificates?: string[];

  @Prop({
    default: '',
  })
  public achievement?: string;

  @Prop({
    default: false,
  })
  public isIndividualTraining?: boolean;
}

export const UserCoachSchema = SchemaFactory.createForClass(UserCoachModel);
