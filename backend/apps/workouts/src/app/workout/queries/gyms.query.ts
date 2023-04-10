import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultGymQuery } from '../workout.constant';

export class GymsQuery {
  @IsNumber()
  @Transform(({ value }) => +value || DefaultGymQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultGymQuery.Limit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultGymQuery.SortDirection;

  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
