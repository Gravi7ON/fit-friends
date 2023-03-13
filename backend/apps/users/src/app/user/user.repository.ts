import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole, UserTrainer, UserCustomer } from '@backend/shared-types';
import { UserTrainerModel } from './models/user-trainer.model';
import { UserEntity } from './entities/user.entity';
import { UserCustomerModel } from './models/user-customer.model';
import { UserTrainerEntity } from './entities/user-trainer.entity';
import { UserCustomerEntity } from './entities/user-customer.entity';

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

  public async findById(id: string): Promise<UserCustomer & UserTrainer | null> {
    const [userTrainer, userCustomer] = await Promise.all([
      this.userTrainerModel
        .findOne({_id: id})
        .exec(),
      this.userCustomerModel
        .findOne({_id: id})
        .exec()
    ]);

    if (userTrainer) {
      return userTrainer;
    }

    return userCustomer;
  }

  public async findByEmail(email: string): Promise<UserCustomer & UserTrainer | null> {
    const [userTrainer, userCustomer] = await Promise.all([
      this.userTrainerModel
        .findOne({email})
        .exec(),
      this.userCustomerModel
        .findOne({email})
        .exec()
    ]);

    if (userTrainer) {
      return userTrainer;
    }

    return userCustomer;
  }

  public async update(id: string, user: UserTrainerEntity | UserCustomerEntity): Promise<UserCustomer & UserTrainer | null> {
    const updatedUser = user.toObject();

    switch(updatedUser.role) {
      case UserRole.Trainer:
        return this.userTrainerModel
        .findByIdAndUpdate(id, {
          ...updatedUser,
        }, {new: true})
        .exec();
      case UserRole.Customer:
        return this.userCustomerModel
        .findByIdAndUpdate(id, {
          ...updatedUser,
        }, {new: true})
        .exec();
    }
  }
}
