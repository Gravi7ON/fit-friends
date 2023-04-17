import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultWorkoutReviewsQuery } from '../workout.constant';

export class WorkoutReviewsQuery {
  @IsNumber()
  @Transform(({ value }) => +value || DefaultWorkoutReviewsQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultWorkoutReviewsQuery.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' =
    DefaultWorkoutReviewsQuery.SortDirection;

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
