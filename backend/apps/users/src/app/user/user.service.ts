import { UserRole } from '@backend/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCustomerEntity } from './entities/user-customer.entity';
import { UserCoachEntity } from './entities/user-coach.entity';
import { UserMessageException } from './user.constant';
import { UserRepository } from './user.repository';
import { UsersQuery } from './queries/users.query';
import { MyFriendsQuery } from './queries/my-friends.query';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
