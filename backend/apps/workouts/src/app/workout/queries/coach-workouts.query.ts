import {
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultCoachQuery } from '../workout.constant';
import { TrainingTime } from '@backend/shared-types';

export class CoachWorkoutsQuery {
  @IsNumber()
  @Transform(({ value }) => +value || DefaultCoachQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultCoachQuery.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultCoachQuery.SortDirection;

  @Min(0, {
    each: true,
  })
  @IsInt({
    each: true,
  })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => Number(item))
  )
  @IsOptional()
  public costs?: number[];

  @Min(1000, {
    each: true,
  })
  @Max(5000, {
    each: true,
  })
  @IsInt({
    each: true,
  })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => Number(item))
  )
  @IsOptional()
  public calories?: number[];

  @Min(0, {
    each: true,
  })
  @Max(5, {
    each: true,
  })
  @IsInt({
    each: true,
  })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => Number(item))
  )
  @IsOptional()
  public rating?: number[];

  @IsEnum(TrainingTime, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public trainingTimes?: TrainingTime[];

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;

  @IsOptional()
  public minMaxPrice?: boolean;
}
