import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultMyNotifyQuery } from '../personal-account.constant';

export class MyNotifiesQuery {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value ?? DefaultMyNotifyQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultMyNotifyQuery.Limit;

  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
