import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { TrainingTime, UserExperience, UserSexForWorkout, UserSpecialization } from '@backend/shared-types';


export class CreateWorkoutDto {
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  public title: string;

  @IsString()
  @IsEnum(UserExperience)
  public experience: UserExperience;

  @IsString()
  @IsEnum(UserSpecialization)
  public specialization: UserSpecialization;

  @IsString()
  @IsEnum(TrainingTime)
  public trainingTime: TrainingTime;

  @IsInt()
  @Min(0)
  public cost: number;

  @IsInt()
  @Min(1000)
  @Max(5000)
  public calories: number;

  @IsString()
  @MinLength(10)
  @MaxLength(140)
  public description: string;

  @IsString()
  @IsEnum(UserSexForWorkout)
  public sex: UserSexForWorkout;

  @IsOptional()
  @IsString()
  @Matches(/[.mov|.avi|.mp4]$/)
  public workoutVideo?: string;

  @IsOptional()
  @IsBoolean()
  public isSpecialOffer?: boolean;
}
