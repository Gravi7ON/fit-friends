import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultFavoriteGymsQuery } from '../personal-account.constant';

export class FavoriteGymsQuery {
  @IsNumber()
  @Max(50)
  @Min(1)
  @Transform(({ value }) => +value ?? DefaultFavoriteGymsQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultFavoriteGymsQuery.Limit;

  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
