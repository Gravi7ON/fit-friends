import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
  Query,
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id', MongoidValidationPipe) id: string) {
    const existedUser = await this.userService.findUser(id);

    return existedUser.role === UserRole.Coach
      ? fillObject(UserCoachRdo, existedUser)
      : fillObject(UserCustomerRdo, existedUser);
  }
}
