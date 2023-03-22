import { Review, TrainingTime, UserExperience, UserSexForWorkout, UserSpecialization } from '@backend/shared-types';
import { Expose } from 'class-transformer';

export class CreatedWorkoutRdo {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public backgroundImage: string;

  @Expose()
  public experience: UserExperience;

  @Expose()
  public specialization: UserSpecialization;

  @Expose()
  public trainingTime: TrainingTime;

  @Expose()
  public cost: number;

  @Expose()
  public calories: number;

  @Expose()
  public description: string;

  @Expose()
  public sex: UserSexForWorkout;

  @Expose()
  public workoutVideo: string;

  @Expose()
  public rating: number;

  @Expose()
  public coachId: string;

  @Expose()
  public isSpecialOffer: boolean;

  @Expose()
  public reviews: Review[];
}
