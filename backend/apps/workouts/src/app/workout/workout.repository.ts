import { OrderWorkout, Review, Workout } from '@backend/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoachOrdersQuery } from './queries/coach-orders.query';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
import { WorkoutEntity } from './workout.entity';
import { WorkoutsQuery } from './queries/workouts.query';
import { GymsQuery } from './queries/gyms.query';
import { WorkoutReviewsQuery } from './queries/workout-reviews.query';

@Injectable()
export class WorkoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: WorkoutEntity): Promise<Workout> {
    const workout = item.toObject();
    return this.prisma.workout.create({
      data: {
        ...workout,
        reviews: {
          connect: [],
        },
        orders: {
          connect: [],
        },
      },
      include: {
        reviews: true,
      },
    });
  }

  public update(item: WorkoutEntity, workoutId: number): Promise<Workout> {
    const workout = item.toObject();

    return this.prisma.workout.update({
      where: { id: workoutId },
      data: {
        ...workout,
        reviews: {
          connect: [],
        },
        orders: {
          connect: [],
        },
      },
      include: {
        reviews: true,
      },
    });
  }

  public find(workoutId: number): Promise<Workout | null> {
    return this.prisma.workout.findFirst({
      where: { id: workoutId },
      include: {
        reviews: true,
      },
    });
  }

  public findMany({
    limit,
    page,
    sortDirection,
    workoutIds,
  }: WorkoutsQuery = {}): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        id: { in: workoutIds },
      },
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public findCoachMany(
    coachId: string,
    {
      limit,
      page,
      sortDirection,
      costs,
      calories,
      rating,
      trainingTimes,
    }: CoachWorkoutsQuery = {}
  ): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        coachId,
        rating,
        trainingTime: { in: trainingTimes },
        cost: {
          gte: costs?.at(0),
          lte: costs?.at(1),
        },
        calories: {
          gte: calories?.at(0),
          lte: calories?.at(1),
        },
      },
      take: limit,
      include: {
        reviews: true,
      },
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public findAllCoachWorkout(coachId: string): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        coachId,
      },
    });
  }

  public findOrders(
    coachId: string,
    coachWorkoutIds: number[],
    { limit, page }: CoachOrdersQuery
  ): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        coachId,
        orders: {
          some: {
            workoutId: {
              in: coachWorkoutIds,
            },
          },
        },
      },
      include: {
        orders: {
          select: {
            sum: true,
            amountWorkout: true,
          },
        },
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public findGym(gymId: number) {
    return this.prisma.gym.findFirst({
      where: {
        id: gymId,
      },
    });
  }

  public findGyms(gymIds: number[], { limit, page, sortDirection }: GymsQuery) {
    return this.prisma.gym.findMany({
      where: {
        id: { in: gymIds },
      },
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async createOrderWorkout(
    order: Omit<Required<OrderWorkout>, 'id' | 'createdAt'>
  ) {
    return this.prisma.orderWorkout.create({
      data: {
        ...order,
      },
    });
  }

  public async createReviewWorkout(review: Review) {
    return this.prisma.review.create({
      data: {
        ...review,
      },
    });
  }

  public findManyReviews(
    workoutId: number,
    { limit, page, sortDirection }: WorkoutReviewsQuery
  ) {
    return this.prisma.workout.findFirst({
      where: {
        id: workoutId,
      },
      include: {
        reviews: {
          take: limit,
          orderBy: [{ createdAt: sortDirection }],
          skip: page > 0 ? limit * (page - 1) : undefined,
        },
      },
    });
  }
}
