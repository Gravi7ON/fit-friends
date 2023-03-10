import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from '@backend/shared-types';
import { UserTrainerModel } from './models/user-trainer.model';
import { UserEntity } from './entities/user.entity';
import { UserCustomerModel } from './models/user-customer.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserTrainerModel.name) private readonly userTrainerModel: Model<UserTrainerModel>,
    @InjectModel(UserCustomerModel.name) private readonly userCustomerModel: Model<UserCustomerModel>
    ) {}

  public async create(item: UserEntity): Promise<User> {
    const user = item.toObject();
    const newUser = user.role === UserRole.Trainer ?
      new this.userTrainerModel(item.toObject()) :
      new this.userCustomerModel(item.toObject());

    return newUser.save();
  }
}
