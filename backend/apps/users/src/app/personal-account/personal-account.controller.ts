import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common-guards/jwt-auth.guard';
import { RoleCustomerGuard } from '../common-guards/role-customer.guard';
import { RequestWithTokenPayload } from '@backend/shared-types';
import { fillObject } from '@backend/core';
import { UserWeekFoodDiaryRdo } from './rdo/user-week-food-diary.rdo';
import { UserFoodDiaryDto } from './dto/user-food-diary.dto';
import { UserWeekWorkoutDiaryRdo } from './rdo/user-week-workout-diary.rdo';
import { UserWorkoutDiaryDto } from './dto/user-workout-diary.dto';
import { PersonalAccountService } from './personal-account.service';
import { FavoriteGymsQuery } from './queries/favorite-gyms.query';
import { UserFavoriteGymRdo } from './rdo/user-favorite-gym.rdo';
import { UserFavoriteGymsRdo } from './rdo/user-favorite-gyms.rdo';
import { UserPurchaseRdo } from './rdo/user-purchase.rdo';
import { UserPurchaseDataRdo } from './rdo/user-purchase-data.rdo';
import { MyPurchaseQuery } from './queries/my-purchase.query';
import { MyNotifiesQuery } from './queries/my-notifies.query';
import { UserNotifyRdo } from './rdo/user-notify.rdo';

@Controller('personal-account')
export class PersonalAccountController {
  constructor(
    private readonly personalAccountService: PersonalAccountService
  ) {}

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/food-diary')
  async findFoodDiary(@Request() request: RequestWithTokenPayload) {
    const userId = request.user._id;
    const weekDiary = await this.personalAccountService.findFoodDiary(userId);

    return fillObject(UserWeekFoodDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Patch('/food-diary')
  async saveFoodDiary(
    @Request() request: RequestWithTokenPayload,
    @Body() dto: UserFoodDiaryDto
  ) {
    const userId = request.user._id;
    const weekDiary = await this.personalAccountService.saveFoodDiary(
      userId,
      dto
    );

    return fillObject(UserWeekFoodDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/workout-diary')
  async findWorkoutDiary(@Request() request: RequestWithTokenPayload) {
    const userId = request.user._id;
    const weekDiary = await this.personalAccountService.findWorkoutDiary(
      userId
    );

    return fillObject(UserWeekWorkoutDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Patch('/workout-diary')
  async saveWorkoutDiary(
    @Request() request: RequestWithTokenPayload,
    @Body() dto: UserWorkoutDiaryDto
  ) {
    const userId = request.user._id;
    const weekDiary = await this.personalAccountService.saveWorkoutDiary(
      userId,
      dto
    );

    return fillObject(UserWeekWorkoutDiaryRdo, weekDiary);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/favorite-gyms')
  async findFavoriteGyms(
    @Request() request: RequestWithTokenPayload,
    @Query() query: FavoriteGymsQuery
  ) {
    const userId = request.user._id;
    const authorization = request.headers.authorization;
    const favoriteGyms = await this.personalAccountService.findFavoriteGyms(
      userId,
      authorization,
      query
    );

    return fillObject(UserFavoriteGymsRdo, favoriteGyms);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Post('/favorite-gyms/:gymId')
  async addFavoriteGym(
    @Request() request: RequestWithTokenPayload,
    @Param('gymId', ParseIntPipe) gymId: number
  ) {
    const userId = request.user._id;
    const authorization = request.headers.authorization;
    const favoriteGym = await this.personalAccountService.addFavoriteGym(
      userId,
      gymId,
      authorization
    );

    return fillObject(UserFavoriteGymRdo, favoriteGym);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Delete('/favorite-gyms/:gymId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavoriteGym(@Param('gymId', ParseIntPipe) gymId: number) {
    this.personalAccountService.removeFavoriteGym(gymId);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Post('/my-purchases/workouts/:workoutId')
  async addPurchaseWorkout(
    @Request() request: RequestWithTokenPayload,
    @Param('workoutId', ParseIntPipe) workoutId: number
  ) {
    const userId = request.user._id;
    const authorization = request.headers.authorization;
    const purchases = await this.personalAccountService.addPurchaseWorkout(
      userId,
      workoutId,
      authorization
    );

    return fillObject(UserPurchaseRdo, purchases);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Patch('/my-purchases/workouts/:workoutId')
  async removePurchaseWorkout(
    @Request() request: RequestWithTokenPayload,
    @Param('workoutId', ParseIntPipe) workoutId: number
  ) {
    const userId = request.user._id;
    const purchases = await this.personalAccountService.removePurchaseWorkout(
      userId,
      workoutId
    );

    return fillObject(UserPurchaseRdo, purchases);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Post('/my-purchases/gyms/:gymId')
  async addPurchaseGym(
    @Request() request: RequestWithTokenPayload,
    @Param('gymId', ParseIntPipe) gymId: number
  ) {
    const userId = request.user._id;
    const authorization = request.headers.authorization;
    const purchases = await this.personalAccountService.addPurchaseGym(
      userId,
      gymId,
      authorization
    );

    return fillObject(UserPurchaseRdo, purchases);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Patch('/my-purchases/gyms/:gymId')
  async removePurchaseGym(
    @Request() request: RequestWithTokenPayload,
    @Param('gymId', ParseIntPipe) gymId: number
  ) {
    const userId = request.user._id;
    const purchases = await this.personalAccountService.removePurchaseGym(
      userId,
      gymId
    );

    return fillObject(UserPurchaseRdo, purchases);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/my-purchases')
  async findMyPurchases(
    @Request() request: RequestWithTokenPayload,
    @Query() query: MyPurchaseQuery
  ) {
    const userId = request.user._id;
    const authorization = request.headers.authorization;
    const myPurchases = await this.personalAccountService.findMyPurchases(
      userId,
      authorization,
      query
    );

    return fillObject(UserPurchaseDataRdo, myPurchases);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Get('/my-notifies')
  async findUserNotifies(
    @Request() request: RequestWithTokenPayload,
    @Query() query: MyNotifiesQuery
  ) {
    const userId = request.user._id;
    const myNotifies = await this.personalAccountService.findMyNotifies(
      userId,
      query
    );

    return fillObject(UserNotifyRdo, myNotifies);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Delete('/my-notifies/:notifyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUserNotify(
    @Param('notifyId') notifyId: string,
    @Request() request: RequestWithTokenPayload
  ) {
    const userId = request.user._id;
    this.personalAccountService.removeMyNotify(notifyId, userId);
  }
}
