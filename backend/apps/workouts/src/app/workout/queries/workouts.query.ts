import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultWorkoutQuery } from '../workout.constant';

export class WorkoutsQuery {
  @IsNumber()
  @Transform(({ value }) => +value || DefaultWorkoutQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultWorkoutQuery.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultWorkoutQuery.SortDirection;

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;

  @IsOptional()
  @Transform(({ value }) => value.split(',').map((id: string) => Number(id)))
  public workoutIds?: number[];
}
