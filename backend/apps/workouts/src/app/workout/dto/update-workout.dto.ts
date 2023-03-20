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
import { TrainingTime, UserSexForWorkout, UserSpecialization } from '@backend/shared-types';


export class UpdateWorkoutDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  public title?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserSpecialization)
  public specialization?: UserSpecialization;

  @IsOptional()
  @IsString()
  @IsEnum(TrainingTime)
  public trainingTime?: TrainingTime;

  @IsOptional()
  @IsInt()
  @Min(0)
  public cost?: number;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(5000)
  public calories?: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  public description?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserSexForWorkout)
  public sex?: UserSexForWorkout;

  @IsOptional()
  @IsString()
  @Matches(/[.mov|.avi|.mp4]$/)
  public workoutVideo?: string;

  @IsOptional()
  @IsBoolean()
  public isSpecialOffer?: boolean;
}
