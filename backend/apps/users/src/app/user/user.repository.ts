import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserRole,
  UserCoach,
  UserCustomer,
  PersonalTrainingStatus,
} from '@backend/shared-types';
import { UserCoachModel } from './models/user-coach.model';
import { UserEntity } from './entities/user.entity';
import { UserCustomerModel } from './models/user-customer.model';
import { UserCoachEntity } from './entities/user-coach.entity';
import { UserCustomerEntity } from './entities/user-customer.entity';
import { UsersQuery } from './queries/users.query';
import { COACH_COLLECTION_NAME } from './user.constant';
import { MyFriendsModel } from './models/my-friends.model';
import { MyFriendsQuery } from './queries/my-friends.query';
import { PersonalTrainingRequestModel } from './models/personal-training-request.model';
import { UpdatePersonalTrainingRequestDto } from './dto/update-personal-training-request.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserCoachModel.name)
    private readonly userCoachModel: Model<UserCoachModel>,
    @InjectModel(UserCustomerModel.name)
    private readonly userCustomerModel: Model<UserCustomerModel>,
    @InjectModel(MyFriendsModel.name)
    private readonly myFriendsModel: Model<MyFriendsModel>,
    @InjectModel(PersonalTrainingRequestModel.name)
    private readonly personalTrainingRequestModel: Model<PersonalTrainingRequestModel>
  ) {}

  public async create(item: UserEntity): Promise<User> {
    const user = item.toObject();
    const newUser =
      user.role === UserRole.Coach
        ? new this.userCoachModel(item.toObject())
        : new this.userCustomerModel(item.toObject());

    return newUser.save();
  }

  public async update(
    id: string,
    user: UserCoachEntity | UserCustomerEntity
  ): Promise<(UserCustomer & UserCoach) | null> {
    const updatedUser = user.toObject();

    switch (updatedUser.role) {
      case UserRole.Coach:
        return this.userCoachModel
          .findByIdAndUpdate(
            id,
            {
              ...updatedUser,
            },
            { new: true }
          )
          .exec();
      case UserRole.Customer:
        return this.userCustomerModel
          .findByIdAndUpdate(
            id,
            {
              ...updatedUser,
            },
            { new: true }
          )
          .exec();
    }
  }

  public async findById(
    userId: string
  ): Promise<(UserCustomer & UserCoach) | null> {
    const [userCoach, userCustomer] = await Promise.all([
      this.userCoachModel.findOne({ _id: userId }).exec(),
      this.userCustomerModel.findOne({ _id: userId }).exec(),
    ]);

    if (userCoach) {
      return userCoach;
    }

    return userCustomer;
  }

  public async findByEmail(
    email: string
  ): Promise<(UserCustomer & UserCoach) | null> {
    const [userCoach, userCustomer] = await Promise.all([
      this.userCoachModel.findOne({ email }).exec(),
      this.userCustomerModel.findOne({ email }).exec(),
    ]);

    if (userCoach) {
      return userCoach;
    }

    return userCustomer;
  }

  public async findUsers({
    limit,
    page,
    sortDirection,
    locations,
    specializations,
    experience,
    role,
  }: UsersQuery): Promise<UserCustomer[] & UserCoach[]> {
    switch (role) {
      case UserRole.Customer:
        return this.userCustomerModel.aggregate([
          locations || specializations || experience
            ? {
                $match: {
                  location: locations ? { $in: locations } : { $ne: {} },
                  specializations: specializations
                    ? { $in: specializations }
                    : { $ne: {} },
                  experience: experience || { $ne: {} },
                },
              }
            : { $addFields: {} },
          { $skip: page > 0 ? limit * (page - 1) : 0 },
          { $limit: limit },
          { $sort: { createdAt: sortDirection } },
          { $addFields: { id: { $toString: '$_id' } } },
          {
            $project: {
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
              password: 0,
              _id: 0,
            },
          },
        ]);
      case UserRole.Coach:
        return this.userCoachModel.aggregate([
          locations || specializations || experience
            ? {
                $match: {
                  location: locations ? { $in: locations } : { $ne: {} },
                  specializations: specializations
                    ? { $in: specializations }
                    : { $ne: {} },
                  experience: experience || { $ne: {} },
                },
              }
            : { $addFields: {} },
          { $skip: page > 0 ? limit * (page - 1) : 0 },
          { $limit: limit },
          { $sort: { createdAt: sortDirection } },
          { $addFields: { id: { $toString: '$_id' } } },
          {
            $project: {
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
              password: 0,
              _id: 0,
            },
          },
        ]);
      default:
        return this.userCustomerModel.aggregate([
          locations || specializations || experience
            ? {
                $match: {
                  location: locations ? { $in: locations } : { $ne: {} },
                  specializations: specializations
                    ? { $in: specializations }
                    : { $ne: {} },
                  experience: experience || { $ne: {} },
                },
              }
            : { $addFields: {} },
          {
            $unionWith: {
              coll: COACH_COLLECTION_NAME,
              pipeline: [
                locations || specializations || experience
                  ? {
                      $match: {
                        location: locations ? { $in: locations } : { $ne: {} },
                        specializations: specializations
                          ? { $in: specializations }
                          : { $ne: {} },
                        experience: experience || { $ne: {} },
                      },
                    }
                  : { $addFields: {} },
              ],
            },
          },
          { $skip: page > 0 ? limit * (page - 1) : 0 },
          { $limit: limit },
          { $sort: { createdAt: sortDirection } },
          { $addFields: { id: { $toString: '$_id' } } },
          {
            $project: {
              __v: 0,
              createdAt: 0,
              updatedAt: 0,
              password: 0,
              _id: 0,
            },
          },
        ]);
    }
  }

  public async addUserFriend(
    userId: string,
    friendId: string
  ): Promise<{ userId: string; friendId: string }> {
    return this.myFriendsModel.create({
      userId,
      friendId,
    });
  }

  public async findUserFriends(
    userId: string,
    { limit, sortDirection, page }: MyFriendsQuery
  ): Promise<UserCustomer[] | null> {
    const userFiendsIds = (await this.myFriendsModel.find({ userId })).map(
      (record) => new Types.ObjectId(record.friendId)
    );

    return this.userCustomerModel.aggregate([
      { $match: { _id: { $in: userFiendsIds } } },
      { $skip: page > 0 ? limit * (page - 1) : 0 },
      { $limit: limit },
      { $sort: { createdAt: sortDirection } },
      { $addFields: { id: { $toString: '$_id' } } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0, password: 0, _id: 0 } },
    ]);
  }

  public async deleteUserFriend(
    userId: string,
    friendId: string
  ): Promise<{ userId: string; friendId: string }> {
    return this.myFriendsModel
      .findOneAndDelete({
        userId,
        friendId,
      })
      .exec();
  }

  public async createPersonalTrainingRequest(
    fromUserId: string,
    toUserId: string
  ) {
    return this.personalTrainingRequestModel.create({
      fromUserId,
      toUserId,
    });
  }

  public async findPersonalTrainingRequestConsideration(
    fromUserId: string,
    toUserId: string
  ) {
    return this.personalTrainingRequestModel.findOne({
      fromUserId,
      toUserId,
      requestStatus: PersonalTrainingStatus.Consideration,
    });
  }

  public async findPersonalTrainingRequest(requestId: string) {
    return this.personalTrainingRequestModel.findOne({
      _id: requestId,
    });
  }

  public async updateStatusPersonalTrainingRequest({
    requestId,
    requestStatus,
  }: UpdatePersonalTrainingRequestDto) {
    return this.personalTrainingRequestModel.findByIdAndUpdate(
      { _id: requestId },
      { requestStatus },
      { new: true }
    );
  }
}
