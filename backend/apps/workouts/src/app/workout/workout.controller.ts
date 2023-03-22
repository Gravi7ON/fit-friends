import { fillObject } from '@backend/core';
import { RequestWithTokenPayload } from '@backend/shared-types';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RoleCoachGuard } from './guards/role-coach.guard';
import { CoachOrdersQuery } from './queries/coach-orders.query';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
import { CoachWorkoutOrdersRdo } from './rdo/coach-workout-orders.rdo';
import { CreatedWorkoutRdo } from './rdo/created-workout.rdo';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService
  ) {}

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Post('/')
  async create(@Body() dto: CreateWorkoutDto, @Request() request: RequestWithTokenPayload) {
    const coachId = request.user?._id;
    const newWorkout = await this.workoutService.createWorkout(dto, coachId);

    return fillObject(CreatedWorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) workoutId: number, @Body() dto: UpdateWorkoutDto, @Request() request: RequestWithTokenPayload) {
    const coachId: string = request.user?._id;
    const newWorkout = await this.workoutService.updateWorkout(dto, workoutId, coachId);

    return fillObject(CreatedWorkoutRdo, newWorkout);
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Get('/')
  async findMany(@Request() request: RequestWithTokenPayload, @Query() query: CoachWorkoutsQuery) {
    const coachId: string = request.user?._id;
    const coachWorkouts = await this.workoutService.findWorkouts(coachId, query);

    return fillObject(CreatedWorkoutRdo, coachWorkouts);
  }

  @UseGuards(JwtAuthGuard, RoleCoachGuard)
  @Get('/coach-orders')
  async findCoachOrders(@Request() request: RequestWithTokenPayload, @Query() query: CoachOrdersQuery) {
    const coachId: string = request?.user._id;
    const coachOrders = await this.workoutService.findCoachOrders(coachId, query);

    return fillObject(CoachWorkoutOrdersRdo, coachOrders);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async find(@Param('id', ParseIntPipe) workoutId: number) {
    const existedWorkout = await this.workoutService.findWorkout(workoutId);

    return fillObject(CreatedWorkoutRdo, existedWorkout);
  }
}
