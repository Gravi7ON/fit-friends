import { Workout } from '@backend/shared-types';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
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

  async updateWorkout(dto: UpdateWorkoutDto, workoutId: number, coachId: string): Promise<Workout> {
    const existedWorkout = await this.findWorkout(workoutId);

    if (existedWorkout.coachId !== coachId) {
      throw new ForbiddenException(WorkoutMessageException.OnlyOwnWorkout);
    }

    const workoutEntity = new WorkoutEntity({
      ...existedWorkout
    });
    workoutEntity.updateEntity(dto);

    return this.workoutRepository.update(workoutEntity, workoutId);
  }

  async findWorkout(workoutId: number): Promise<Workout | null> {
    const existedWorkout = await this.workoutRepository.find(workoutId);

    if (!existedWorkout) {
      throw new NotFoundException(WorkoutMessageException.NotFound);
    }

    return existedWorkout;
  }

  async findWorkouts(coachId: string, query: CoachWorkoutsQuery): Promise<Workout[]> {
    const existedWorkouts = await this.workoutRepository.findMany(coachId, query);

    return existedWorkouts;
  }
}
