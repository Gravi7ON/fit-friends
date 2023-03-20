import { fillObject } from '@backend/core';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreatedWorkoutRto } from './rdo/created-workout.rdo';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateWorkoutDto,) {
    const newWorkout = await this.workoutService.createWorkout(dto);

    return fillObject(CreatedWorkoutRto, newWorkout);
  }
}
