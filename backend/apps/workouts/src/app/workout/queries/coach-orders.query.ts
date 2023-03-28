import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultCoachQuery } from '../workout.constant';

export class CoachOrdersQuery {
  @IsNumber()
  @Transform(({ value }) => +value || DefaultCoachQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultCoachQuery.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultCoachQuery.SortDirection;

  @IsIn(['sum', 'amountWorkout'])
  @IsOptional()
  public sortField?: 'sum' | 'amountWorkout';

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
