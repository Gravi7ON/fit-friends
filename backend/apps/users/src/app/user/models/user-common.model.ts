import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { User, UserLocation, UserRole, UserSex } from '@backend/shared-types';

export class UserModel extends Document implements User {
  @Prop({
    required: true
  })
  public name: string;

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    default: 'unknown.jpg'
  })
  public avatar?: string;

  @Prop({
    required: true
  })
  public password: string;

  @Prop({
    required: true,
    type: String,
    enum: UserSex
  })
  public sex: UserSex;

  @Prop({
    default: null
  })
  public dateBirth?: Date | null;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public role: UserRole.Customer;

  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
  })
  public location: UserLocation;

  @Prop({
    default: ''
  })
  public about?: string;
}
