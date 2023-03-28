import {
  ArrayMaxSize,
  ArrayUnique,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  TrainingTime,
  UserExperience,
  UserSpecialization,
} from '@backend/shared-types';

export class AddUserInfoDto {
  @IsString()
  @IsEnum(UserExperience)
  public experience: UserExperience;

  @IsString({
    each: true,
  })
  @IsEnum(UserSpecialization, {
    each: true,
  })
  @ArrayMaxSize(3)
  @ArrayUnique()
  public specializations: UserSpecialization[];

  @IsOptional()
  @IsString()
  @Matches(/.pdf$/)
  public certificates?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  public achievement?: string;

  @IsOptional()
  @IsBoolean()
  public isIndividualTraining?: boolean;

  @IsOptional()
  @IsString()
  @IsEnum(TrainingTime)
  public trainingTime?: TrainingTime;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(5000)
  public targetDeclineСalories?: number;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(5000)
  public dayDeclineCalories?: number;

  @IsOptional()
  @IsBoolean()
  public isReadyTraining?: boolean;
}
