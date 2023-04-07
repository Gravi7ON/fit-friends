import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
  Query,
  Delete,
  HttpStatus,
  HttpCode,
  Post,
} from '@nestjs/common';
import { fillObject } from '@backend/core';
import { RequestWithTokenPayload, UserRole } from '@backend/shared-types';
import { JwtAuthGuard } from '../common-guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../common-pipes/mongoid-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCustomerRdo } from './rdo/user-customer.rdo';
import { UserCoachRdo } from './rdo/user-coach.rdo';
import { UserService } from './user.service';
import { UsersQuery } from './queries/users.query';
import { RoleCoachGuard } from '../common-guards/role-coach.guard';
import { MyFriendsQuery } from './queries/my-friends.query';
import { RoleCustomerGuard } from '../common-guards/role-customer.guard';
import { UserFoodDiaryDto } from './dto/user-food-diary.dto';
import { UserWeekFoodDiaryRdo } from './rdo/user-week-food-diary.rdo';
import { UserWorkoutDiaryDto } from './dto/user-workout-diary.dto';
import { UserWeekWorkoutDiaryRdo } from './rdo/user-week-workout-diary.rdo';
import { UserFriendRdo } from './rdo/user-friend.rdo';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Get('/')
  async findUsers(@Query() query: UsersQuery) {
    const users = await this.userService.findUsers(query);

    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  async updateUser(
    @Request() request: RequestWithTokenPayload,
    @Body() dto: UpdateUserDto
  ) {
    const userId = request.user._id;
    const existedUser = await this.userService.updateUser(userId, dto);

    return existedUser.role === UserRole.Coach
      ? fillObject(UserCoachRdo, existedUser)
      : fillObject(UserCustomerRdo, existedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-friends')
  async findUserFriends(
    @Request() request: RequestWithTokenPayload,
    @Query() query: MyFriendsQuery
  ) {
    const userId = request.user._id;
    const users = await this.userService.findUserFriends(userId, query);

    return users;
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Post('/my-friends/:friendId')
  async addUserFriend(
    @Request() request: RequestWithTokenPayload,
    @Param('friendId', MongoidValidationPipe) friendId: string
  ) {
    const userId = request.user._id;
    const userFriend = await this.userService.addUserFriend(userId, friendId);

    return fillObject(UserFriendRdo, userFriend);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/my-friends/:friendId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserFriend(
    @Request() request: RequestWithTokenPayload,
    @Param('friendId', MongoidValidationPipe) friendId: string
  ) {
    const userId = request.user._id;
    this.userService.deleteUserFriend(userId, friendId);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/food-diary')
  async findFoodDiary(@Request() request: RequestWithTokenPayload) {
    const userId = request.user._id;
    const weekDiary = await this.userService.findFoodDiary(userId);

    return fillObject(UserWeekFoodDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Patch('/food-diary')
  async saveFoodDiary(
    @Request() request: RequestWithTokenPayload,
    @Body() dto: UserFoodDiaryDto
  ) {
    const userId = request.user._id;
    const weekDiary = await this.userService.saveFoodDiary(userId, dto);

    return fillObject(UserWeekFoodDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/workout-diary')
  async findWorkoutDiary(@Request() request: RequestWithTokenPayload) {
    const userId = request.user._id;
    const weekDiary = await this.userService.findWorkoutDiary(userId);

    return fillObject(UserWeekWorkoutDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Patch('/workout-diary')
  async saveWorkoutDiary(
    @Request() request: RequestWithTokenPayload,
    @Body() dto: UserWorkoutDiaryDto
  ) {
    const userId = request.user._id;
    const weekDiary = await this.userService.saveWorkoutDiary(userId, dto);

    return fillObject(UserWeekWorkoutDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id', MongoidValidationPipe) id: string) {
    const existedUser = await this.userService.findUser(id);

    return existedUser.role === UserRole.Coach
      ? fillObject(UserCoachRdo, existedUser)
      : fillObject(UserCustomerRdo, existedUser);
  }
}
