import { Workout } from '@backend/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { RANDOM_STATIC_IMAGE_PATH, WorkoutMessageException } from './workout.constant';
import { WorkoutEntity } from './workout.entity';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async createWorkout(dto: CreateWorkoutDto, coachId: string): Promise<Workout> {
    const workoutEntity = new WorkoutEntity({
      ...dto,
      backgroundImage: RANDOM_STATIC_IMAGE_PATH,
      coachId
    });

    return this.workoutRepository.create(workoutEntity);
  }

  async findWorkout(workoutId: number): Promise<Workout | null> {
    const existedWorkout = await this.workoutRepository.find(workoutId);

    if (!existedWorkout) {
      throw new NotFoundException(WorkoutMessageException.NotFound);
    }

    return existedWorkout;
  }
}
