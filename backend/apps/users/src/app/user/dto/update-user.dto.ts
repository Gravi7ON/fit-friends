import {
  ArrayMaxSize,
  ArrayUnique,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { TrainingTime, UserExperience, UserLocation, UserSex, UserSpecialization } from '@backend/shared-types';


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  @Matches(/[a-zа-яё\s]+/i)
  public name?: string;

  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/)
  public avatar?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserSex)
  public sex?: UserSex;

  @IsOptional()
  @IsDateString()
  public dateBirth?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(UserLocation)
  public location?: UserLocation;

  @IsOptional()
  @IsString()
  public about?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserExperience)
  public experience?: UserExperience;

  @IsOptional()
  @IsString({
    each: true
  })
  @IsEnum(UserSpecialization, {
    each: true
  })
  @ArrayMaxSize(3)
  @ArrayUnique()
  public specializations?: UserSpecialization[];

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
  @Min(1000)
  @Max(5000)
  public targetDeclineСalories?: number;

  @IsOptional()
  @Min(1000)
  @Max(5000)
  public dayDeclineCalories?: number;

  @IsOptional()
  @IsBoolean()
  public isReadyTraining?: boolean;
}
