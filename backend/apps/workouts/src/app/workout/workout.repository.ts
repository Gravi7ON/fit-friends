import { Injectable } from '@nestjs/common';
import { Workout } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CoachWorkoutsQuery } from './queries/coach-workouts.query';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: WorkoutEntity): Promise<Workout>  {
    const workout = item.toObject();
    return this.prisma.workout.create({
      data: {
        ...workout,
        reviews: {
          connect: []
        }
      },
      include: {
        reviews: true,
      }
    });
  }

  public update(item: WorkoutEntity, workoutId: number): Promise<Workout> {
    const workout = item.toObject();

    return this.prisma.workout.update({
      where: { id: workoutId },
      data: {
        ...workout,
        reviews: {
          connect: []
        }
      },
      include: {
        reviews: true
      }
    });
  }

  public find(workoutId: number): Promise<Workout | null> {
    return this.prisma.workout.findFirst({
      where: { id: workoutId },
      include: {
        reviews: true,
      }
    })
  }

  public findMany(coachId: string, {limit, page, sortDirection, costs, calories, rating, trainingTimes}: CoachWorkoutsQuery): Promise<Workout[] | null> {
    return this.prisma.workout.findMany({
      where: {
        coachId,
        rating,
        trainingTime: { in:  trainingTimes},
        cost: {
          gte: costs?.at(0),
          lte: costs?.at(1)
        },
        calories: {
          gte: calories?.at(0),
          lte: calories?.at(1)
        }
      },
      take: limit,
      include: {
        reviews: true
      },
      orderBy: [ { createdAt: sortDirection } ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
