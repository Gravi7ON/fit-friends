import { Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { UserRole, WeekFoodDiary } from '@backend/shared-types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCustomerEntity } from './entities/user-customer.entity';
import { UserCoachEntity } from './entities/user-coach.entity';
import { UserMessageException } from './user.constant';
import { UserRepository } from './user.repository';
import { UsersQuery } from './queries/users.query';
import { MyFriendsQuery } from './queries/my-friends.query';
import { UserFoodDiaryDto } from './dto/user-food-diary.dto';

dayjs.extend(isoWeek);

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

  async saveFoodDiary(userId: string, dto: UserFoodDiaryDto) {
    const foodDiary: WeekFoodDiary = {
      ...dto,
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    };

    const currentWeekDiary = await this.userRepository.findFoodDiary({
      userId,
      year: foodDiary.year,
      weekOfYear: foodDiary.weekOfYear,
    });

    if (!currentWeekDiary) {
      const newFoodDiary = await this.userRepository.saveFoodDiary(foodDiary);

      return newFoodDiary;
    }

    return this.userRepository.updateFoodDiary(foodDiary);
  }

  async findFoodDiary(userId: string) {
    const weekDiary = await this.userRepository.findFoodDiary({
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    });

    if (!weekDiary) {
      throw new NotFoundException(UserMessageException.FoodDiaryNotFound);
    }

    return weekDiary;
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
