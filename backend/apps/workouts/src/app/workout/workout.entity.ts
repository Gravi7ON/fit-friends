import { Entity } from '@backend/core';
import {
  OrderWorkout,
  Review,
  TrainingTime,
  UserExperience,
  UserSexForWorkout,
  UserSpecialization,
  Workout,
} from '@backend/shared-types';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

export class WorkoutEntity implements Entity<WorkoutEntity>, Workout {
  public id?: number;
  public title: string;
  public backgroundImage?: string;
  public experience: UserExperience | string;
  public specialization: UserSpecialization | string;
  public trainingTime: TrainingTime | string;
  public cost: number;
  public calories: number;
  public description: string;
  public sex: UserSexForWorkout | string;
  public workoutVideo?: string;
  public rating?: number;
  public coachId: string;
  public isSpecialOffer?: boolean;
  public createdAt?: Date;
  public reviews?: Review[];
  public orders?: OrderWorkout[];

  constructor(workout: Workout) {
    this.fillEntity(workout);
  }

  public fillEntity(entity: Workout) {
    this.id = entity.id;
    this.title = entity.title;
    this.backgroundImage = entity.backgroundImage;
    this.experience = entity.experience;
    this.specialization = entity.specialization;
    this.trainingTime = entity.trainingTime;
    this.cost = entity.cost;
    this.calories = entity.calories;
    this.description = entity.description;
    this.sex = entity.sex;
    this.workoutVideo = entity.workoutVideo;
    this.rating = entity.rating;
    this.coachId = entity.coachId;
    this.isSpecialOffer = entity.isSpecialOffer;
    this.createdAt = entity.createdAt;
    this.reviews = entity.reviews ?? [];
    this.orders = [];
  }

  public updateEntity(entity: UpdateWorkoutDto) {
    this.title = entity.title;
    this.specialization = entity.specialization;
    this.trainingTime = entity.trainingTime;
    this.cost = entity.cost;
    this.calories = entity.calories;
    this.description = entity.description;
    this.sex = entity.sex;
    this.workoutVideo = entity.workoutVideo;
    this.isSpecialOffer = entity.isSpecialOffer;
  }

  public updateRatingEntity(rating: number) {
    this.rating = Math.round(
      (this.reviews.reduce((prev, review) => (prev += review.rating), 0) +
        rating) /
        (this.reviews.length + 1)
    );
  }

  public toObject(): WorkoutEntity {
    return {
      ...this,
    };
  }
}
