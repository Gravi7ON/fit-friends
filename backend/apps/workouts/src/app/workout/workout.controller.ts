import { fillObject } from '@backend/core';
import { RequestWithTokenPayload } from '@backend/shared-types';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RoleCoachGuard } from './guards/role-coach.guard';
import { CoachOrdersQuery } from './queries/coach-orders.query';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
import { CoachWorkoutOrdersRdo } from './rdo/coach-workout-orders.rdo';
import { CreatedWorkoutRdo } from './rdo/created-workout.rdo';
import { WorkoutService } from './workout.service';
import { WorkoutsQuery } from './queries/workouts.query';
import { GymsQuery } from './queries/gyms.query';
import { CreateWorkoutOrderDto } from './dto/create-workout-order.dto';
import { RoleCustomerGuard } from './guards/role.customer.guard';
import { CreateWorkoutReviewDto } from './dto/create-workout-review.dto';
import { WorkoutReviewsQuery } from './queries/workout-reviews.query';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/gyms')
  async findAllGyms(@Query() query: GymsQuery) {
    const existedGyms = await this.workoutService.findAllGyms(query);

    return existedGyms;
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Get('/coach-orders')
  async findCoachOrders(
    @Request() request: RequestWithTokenPayload,
    @Query() query: CoachOrdersQuery
  ) {
    const coachId: string = request?.user._id;
    const coachOrders = await this.workoutService.findCoachOrders(
      coachId,
      query
    );

    return fillObject(CoachWorkoutOrdersRdo, coachOrders);
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Post('/coach')
  async create(
    @Body() dto: CreateWorkoutDto,
    @Request() request: RequestWithTokenPayload
  ) {
    const coachId = request.user?._id;
    const newWorkout = await this.workoutService.createWorkout(dto, coachId);

    return fillObject(CreatedWorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Get('/coach')
  async findCoachWorkouts(
    @Request() request: RequestWithTokenPayload,
    @Query() query: CoachWorkoutsQuery
  ) {
    const coachId: string = request.user?._id;
    const coachWorkouts = await this.workoutService.findCoachWorkouts(
      coachId,
      query
    );

    return fillObject(CreatedWorkoutRdo, coachWorkouts);
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Patch('/coach/:id')
  async update(
    @Param('id', ParseIntPipe) workoutId: number,
    @Body() dto: UpdateWorkoutDto,
    @Request() request: RequestWithTokenPayload
  ) {
    const coachId: string = request.user?._id;
    const newWorkout = await this.workoutService.updateWorkout(
      dto,
      workoutId,
      coachId
    );

    return fillObject(CreatedWorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async find(@Param('id', ParseIntPipe) workoutId: number) {
    const existedWorkout = await this.workoutService.findWorkout(workoutId);

    return fillObject(CreatedWorkoutRdo, existedWorkout);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findMany(@Query() query: WorkoutsQuery) {
    const workouts = await this.workoutService.findWorkouts(query);

    return fillObject(CreatedWorkoutRdo, workouts);
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Post('/orders')
  async createOrderWorkout(
    @Body() dto: CreateWorkoutOrderDto,
    @Request() request: RequestWithTokenPayload
  ) {
    const userId = request.user?._id;
    const authorization = request.headers.authorization;
    const newOrder = await this.workoutService.createOrderWorkout(
      dto,
      userId,
      authorization
    );

    return newOrder;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/gyms/:ids')
  async findGyms(
    @Param('ids', ParseArrayPipe) gymIds: string[],
    @Query() query: GymsQuery
  ) {
    const existedGyms = await this.workoutService.findGyms(gymIds, query);

    return existedGyms;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/gym/:id')
  async findGym(@Param('id', ParseIntPipe) gymId: number) {
    const existedGym = await this.workoutService.findGym(gymId);

    return existedGym;
  }

  @UseGuards(JwtAuthGuard, RoleCustomerGuard)
  @Post('/reviews')
  async createReviewWorkout(
    @Body() dto: CreateWorkoutReviewDto,
    @Request() request: RequestWithTokenPayload
  ) {
    const userId = request.user?._id;
    const newReview = await this.workoutService.createReviewWorkout(
      dto,
      userId
    );

    return newReview;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/reviews/:workoutId')
  async findReviewsWorkout(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Query() query: WorkoutReviewsQuery
  ) {
    const existedReviews = await this.workoutService.findReviewsWorkout(
      workoutId,
      query
    );

    return existedReviews;
  }
}
