import { Injectable } from '@nestjs/common';
import { Workout } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
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

  public find(workoutId: number): Promise<Workout | null> {
    return this.prisma.workout.findFirst({
      where: { id: workoutId },
      include: {
        reviews: true,
      }
    })
  }
}
