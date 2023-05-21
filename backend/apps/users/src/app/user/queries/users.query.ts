import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultUsersQuery } from '../user.constant';
import {
  UserExperience,
  UserLocation,
  UserRole,
  UserSpecialization,
} from '@backend/shared-types';

export class UsersQuery {
  @IsNumber()
  @Max(50)
  @Min(1)
  @Transform(({ value }) => +value ?? DefaultUsersQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultUsersQuery.Limit;

  @IsIn([1, -1])
  @Transform(({ value }) => (value === 'asc' ? 1 : -1))
  @IsOptional()
  public sortDirection?: 1 | -1 = DefaultUsersQuery.Desc;

  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsEnum(UserLocation, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public locations?: UserLocation[];

  @IsEnum(UserSpecialization, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public specializations?: UserSpecialization[];

  @IsEnum(UserExperience)
  @IsOptional()
  public experience?: UserExperience;

  @IsIn(['пользователи', 'тренеры'])
  @IsOptional()
  public role?: string;
}
