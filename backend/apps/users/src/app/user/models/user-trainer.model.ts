import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserExperience, UserSpecialization, UserTrainer } from '@backend/shared-types';
import { UserModel } from './user-common.model';

@Schema({
  collection: 'users-trainer',
  timestamps: true
})
export class UserTrainerModel extends UserModel implements UserTrainer {
  constructor() {
    super();
  }

  @Prop({
    default: '',
    type: String
  })
  public experience?: UserExperience;

  @Prop({
    default: []
  })
  public specializations?: UserSpecialization[];

  @Prop({
    default: []
  })
  public certificates?: string[];

  @Prop({
    default: ''
  })
  public achievement?: string;

  @Prop({
    default: false
  })
  public isIndividualTraining?: boolean;
}

export const UserTrainerSchema = SchemaFactory.createForClass(UserTrainerModel);
