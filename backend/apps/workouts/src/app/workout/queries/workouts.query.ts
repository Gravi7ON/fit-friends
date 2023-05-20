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
import { DefaultWorkoutQuery } from '../workout.constant';
import { UserSpecialization } from '@backend/shared-types';

export class WorkoutsQuery {
  @IsNumber()
  @Transform(({ value }) => +value || DefaultWorkoutQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultWorkoutQuery.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultWorkoutQuery.SortDirection;

  @IsIn(['cheeper', 'moreExpensive', 'free'])
  @IsOptional()
  public sort?: 'cheeper' | 'moreExpensive' | 'free';

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;

  @IsOptional()
  @Transform(({ value }) => value.split(',').map((id: string) => Number(id)))
  public workoutIds?: number[];

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

  @IsEnum(UserSpecialization, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public specializations?: UserSpecialization[];

  @IsOptional()
  public minMaxPrice?: boolean;
}
