import { OrderWorkout, Workout } from '@backend/shared-types';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CoachOrdersQuery } from './queries/coach-orders.query';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
import {
  RANDOM_STATIC_IMAGE_PATH,
  SortFiled,
  SortingDirection,
  WorkoutMessageException,
} from './workout.constant';
import { WorkoutEntity } from './workout.entity';
import { WorkoutRepository } from './workout.repository';
import { WorkoutsQuery } from './queries/workouts.query';
import { GymsQuery } from './queries/gyms.query';
import { CreateWorkoutOrderDto } from './dto/create-workout-order.dto';
import axios from 'axios';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  async createWorkout(
    dto: CreateWorkoutDto,
    coachId: string
  ): Promise<Workout> {
    const workoutEntity = new WorkoutEntity({
      ...dto,
      backgroundImage: RANDOM_STATIC_IMAGE_PATH,
      coachId,
    });

    return this.workoutRepository.create(workoutEntity);
  }

  async updateWorkout(
    dto: UpdateWorkoutDto,
    workoutId: number,
    coachId: string
  ): Promise<Workout> {
    const existedWorkout = await this.findWorkout(workoutId);

    if (existedWorkout.coachId !== coachId) {
      throw new ForbiddenException(WorkoutMessageException.OnlyOwnWorkout);
    }

    const workoutEntity = new WorkoutEntity({
      ...existedWorkout,
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

  async findGym(gymId: number) {
    const existedGym = await this.workoutRepository.findGym(gymId);

    if (!existedGym) {
      throw new NotFoundException(WorkoutMessageException.NotFoundGym);
    }

    return existedGym;
  }

  async findGyms(gymIds: string[], query: GymsQuery) {
    if (!gymIds.every((id) => !Number.isNaN(+id))) {
      throw new NotFoundException(WorkoutMessageException.NotConvertToNumber);
    }

    const existedGyms = await this.workoutRepository.findGyms(
      gymIds.map((id) => Number(id)),
      query
    );

    return existedGyms;
  }

  async findCoachWorkouts(coachId: string, query: CoachWorkoutsQuery) {
    const existedWorkouts = await this.workoutRepository.findCoachMany(
      coachId,
      query
    );

    return existedWorkouts;
  }

  async findWorkouts(query: WorkoutsQuery) {
    const existedWorkouts = await this.workoutRepository.findMany(query);

    return existedWorkouts;
  }

  async findCoachOrders(
    coachId: string,
    query: CoachOrdersQuery
  ): Promise<Workout[]> {
    const existedWorkouts = await this.workoutRepository.findAllCoachWorkout(
      coachId
    );

    if (!existedWorkouts.length) {
      throw new BadRequestException(WorkoutMessageException.NotAnyWorkout);
    }

    const existedWorkoutId = existedWorkouts.map((workout) => workout.id);

    const orders = await this.workoutRepository.findOrders(
      coachId,
      existedWorkoutId,
      query
    );

    const transformOrders = orders.map((workout) => {
      return {
        ...workout,
        orders: workout.orders.reduce(
          (
            prev: [{ sum: number; amountWorkout: number }],
            order: OrderWorkout
          ) => [
            {
              sum: (prev[0].sum += order.sum),
              amountWorkout: (prev[0].amountWorkout += order.amountWorkout),
            },
          ],
          [{ sum: 0, amountWorkout: 0 }]
        ),
      };
    });

    switch (query.sortField) {
      case SortFiled.Sum:
        if (query.sortDirection === SortingDirection.Asc) {
          return transformOrders.sort(
            (a, b) => a.orders[0].sum - b.orders[0].sum
          );
        } else {
          return transformOrders.sort(
            (a, b) => b.orders[0].sum - a.orders[0].sum
          );
        }
      case SortFiled.AmountWorkout:
        if (query.sortDirection === SortingDirection.Asc) {
          return transformOrders.sort(
            (a, b) => a.orders[0].amountWorkout - b.orders[0].amountWorkout
          );
        } else {
          return transformOrders.sort(
            (a, b) => b.orders[0].amountWorkout - a.orders[0].amountWorkout
          );
        }

      default:
        return transformOrders;
    }
  }

  async createOrderWorkout(
    dto: CreateWorkoutOrderDto,
    userId: string,
    authorization: string
  ): Promise<OrderWorkout> {
    const newOrder = {
      ...dto,
      customerId: userId,
      sum: dto.amountWorkout * dto.cost,
    };

    await this.findWorkout(dto.workoutId);
    const newWorkoutOrder = await this.workoutRepository.createOrderWorkout(
      newOrder
    );

    try {
      await axios.post(
        `http://localhost:${process.env.USERS_PORT}/api/personal-account/my-purchases/workouts/${dto.workoutId}`,
        {},
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
    } catch (err) {
      throw new NotFoundException(err.cause);
    }

    return newWorkoutOrder;
  }
}
