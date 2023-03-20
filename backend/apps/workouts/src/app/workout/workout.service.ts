import { Workout } from '@backend/shared-types';
import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { RANDOM_STATIC_IMAGE_PATH } from './workout.constant';
import { WorkoutEntity } from './workout.entity';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async createWorkout(dto: CreateWorkoutDto): Promise<Workout> {
    const workoutEntity = new WorkoutEntity({
      ...dto,
      backgroundImage: RANDOM_STATIC_IMAGE_PATH
    });

    return this.workoutRepository.create(workoutEntity);
  }

}
