import {
  CommandEvent,
  OrderWorkout,
  Review,
  Workout,
} from '@backend/shared-types';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CoachOrdersQuery } from './queries/coach-orders.query';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
import {
  RABBITMQ_SERVICE,
  RangeImages,
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
import { ClientProxy } from '@nestjs/microservices';
import {
  createEvent,
  fillObject,
  getRandomPositiveInteger,
} from '@backend/core';
import { WorkoutPayloadRdo } from './rdo/workout-payload.dto';
import { CreateWorkoutReviewDto } from './dto/create-workout-review.dto';
import { WorkoutReviewsQuery } from './queries/workout-reviews.query';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async createWorkout(
    dto: CreateWorkoutDto,
    coachId: string
  ): Promise<Workout> {
    const workoutEntity = new WorkoutEntity({
      ...dto,
      backgroundImage: `http://localhost:${
        process.env.PORT
      }/api/files/workouts/training-${getRandomPositiveInteger(
        RangeImages.Min,
        RangeImages.Max
      )}.jpg`,
      coachId,
    });

    const workout = await this.workoutRepository.create(workoutEntity);

    this.rabbitClient.emit(
      createEvent(CommandEvent.SendWorkout),
      fillObject(WorkoutPayloadRdo, workout)
    );

    return workout;
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

  async findAllGyms(query: GymsQuery) {
    const existedGyms = await this.workoutRepository.findAllGyms(query);

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

  async createReviewWorkout(
    dto: CreateWorkoutReviewDto,
    userId: string
  ): Promise<Review> {
    const newReview = {
      ...dto,
      customerId: userId,
    };

    const existedWorkout = await this.findWorkout(dto.workoutId);
    const newWorkoutReview = await this.workoutRepository.createReviewWorkout(
      newReview
    );

    const workoutEntity = new WorkoutEntity({
      ...existedWorkout,
    });
    workoutEntity.updateRatingEntity(dto.rating);

    await this.workoutRepository.update(workoutEntity, dto.workoutId);

    return newWorkoutReview;
  }

  async findReviewsWorkout(workoutId: number, query: WorkoutReviewsQuery) {
    const existedReviews = await this.workoutRepository.findManyReviews(
      workoutId,
      query
    );

    return existedReviews?.reviews;
  }
}
