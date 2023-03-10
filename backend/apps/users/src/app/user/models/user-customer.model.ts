import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingTime, UserCustomer, UserExperience, UserSpecialization } from '@backend/shared-types';
import { UserModel } from './user-common.model';

@Schema({
  collection: 'users-customer',
  timestamps: true
})
export class UserCustomerModel extends UserModel implements UserCustomer {
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
    default: '',
    type: String
  })
  public trainingTime: TrainingTime;

  @Prop({
    default: 0
  })
  public targetReduceСalories?: number;

  @Prop({
    default: 0
  })
  public dayReduceCalories?: number;

  @Prop({
    default: false
  })
  public isReadyTraining?: boolean;
}

export const UserCustomerSchema = SchemaFactory.createForClass(UserCustomerModel);
