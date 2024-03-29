import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UserRole } from '@backend/shared-types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCustomerEntity } from './entities/user-customer.entity';
import { UserCoachEntity } from './entities/user-coach.entity';
import { UserMessageException } from './user.constant';
import { UserRepository } from './user.repository';
import { UsersQuery } from './queries/users.query';
import { MyFriendsQuery } from './queries/my-friends.query';
import { InjectModel } from '@nestjs/mongoose';
import { MyFriendsModel } from './models/my-friends.model';
import { UpdatePersonalTrainingRequestDto } from './dto/update-personal-training-request.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectModel(MyFriendsModel.name)
    private readonly myFriendsModel: Model<MyFriendsModel>
  ) {}

  async findUser(id: string) {
    const existedUser = await this.userRepository.findById(id);

    if (!existedUser) {
      throw new NotFoundException(UserMessageException.NotFound);
    }

    return existedUser;
  }

  async findUsers(query: UsersQuery) {
    const users = await this.userRepository.findUsers(query);

    return users;
  }

  async findUserFriends(userId: string, query: MyFriendsQuery) {
    const users = await this.userRepository.findUserFriends(userId, query);

    return users;
  }

  async addUserFriend(userId: string, friendId: string) {
    const existedUser = await this.userRepository.findById(friendId);

    if (!existedUser) {
      throw new NotFoundException(UserMessageException.NotFound);
    }

    const existedFriend = await this.myFriendsModel.findOne({
      userId,
      friendId,
    });

    if (existedFriend) {
      throw new ConflictException(UserMessageException.AlreadyExists);
    }

    return this.userRepository.addUserFriend(userId, friendId);
  }

  async deleteUserFriend(userId: string, friendId: string) {
    const removedFriend = await this.userRepository.deleteUserFriend(
      userId,
      friendId
    );

    if (!removedFriend) {
      Logger.error(UserMessageException.NotFound);
    }
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const existUser = await this.findUser(id);

    let userEntity: UserCustomerEntity & UserCoachEntity;

    switch (existUser.role) {
      case UserRole.Coach:
        userEntity = new UserCoachEntity(existUser);
        dto.certificates
          ? userEntity.certificates.push(dto.certificates)
          : null;
        userEntity.updateEntity({
          ...existUser,
          ...dto,
        });
        break;
      case UserRole.Customer:
        userEntity = new UserCustomerEntity(existUser);
        userEntity.updateEntity({
          ...existUser,
          ...dto,
        });
    }

    const updatedUser = await this.userRepository.update(id, userEntity);

    return updatedUser;
  }

  async createPersonalTrainingRequest(fromUserId: string, toUserId: string) {
    if (fromUserId === toUserId) {
      throw new ConflictException(UserMessageException.PersonalRequestConflict);
    }

    if (!(await this.findUser(toUserId))) {
      throw new NotFoundException(UserMessageException.NotFound);
    }

    if (
      await this.userRepository.findPersonalTrainingRequestConsideration(
        fromUserId,
        toUserId
      )
    ) {
      throw new ConflictException(
        UserMessageException.PersonalRequestToUserExists
      );
    }

    return this.userRepository.createPersonalTrainingRequest(
      fromUserId,
      toUserId
    );
  }

  async updateStatusPersonalTrainingRequest(
    fromUserId: string,
    { requestId, requestStatus }: UpdatePersonalTrainingRequestDto
  ) {
    const personalRequest =
      await this.userRepository.findPersonalTrainingRequest(requestId);

    if (!personalRequest) {
      throw new NotFoundException(UserMessageException.PersonalRequestNotFound);
    }

    if (requestStatus === personalRequest.requestStatus) {
      throw new BadRequestException(
        UserMessageException.PersonalRequestBadStatus
      );
    }

    if (fromUserId !== personalRequest.toUserId) {
      throw new ConflictException(UserMessageException.OnlyLinkedRequest);
    }

    return this.userRepository.updateStatusPersonalTrainingRequest({
      requestId,
      requestStatus,
    });
  }

  async findAllPersonalTrainingRequests(coachId: string) {
    const personalTrainingRequests =
      await this.userRepository.findPersonalTrainingRequests(coachId);

    return personalTrainingRequests;
  }

  async findAllPersonalTrainingCustomerRequests(customerId: string) {
    const personalTrainingRequests =
      await this.userRepository.findAllPersonalTrainingCustomerRequests(
        customerId
      );

    return personalTrainingRequests;
  }
}
