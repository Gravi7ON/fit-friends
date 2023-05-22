import {
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultGymQuery } from '../workout.constant';
import { UserLocation } from '@backend/shared-types';

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

  @IsEnum(UserLocation, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public locations?: UserLocation[];

  @IsString({
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public features?: string[];

  @IsOptional()
  public isOriginal?: string;

  @IsOptional()
  public minMaxPrice?: boolean;
}
