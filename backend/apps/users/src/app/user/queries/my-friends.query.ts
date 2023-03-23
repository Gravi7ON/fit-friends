import { IsIn, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultUsersQuery } from '../user.constant';

export class MyFriendsQuery {
  @IsNumber()
  @Max(50)
  @Min(1)
  @Transform(({ value } ) => +value ?? DefaultUsersQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultUsersQuery.Limit;

  @IsIn([1, -1])
  @Transform(({ value }) => value === 'asc' ? 1 : -1)
  @IsOptional()
  public sortDirection?: 1 | -1 = DefaultUsersQuery.Desc;

  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
