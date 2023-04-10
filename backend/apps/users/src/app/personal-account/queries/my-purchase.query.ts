import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultMyPurchaseQuery } from '../personal-account.constant';

export class MyPurchaseQuery {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value ?? DefaultMyPurchaseQuery.Limit)
  @IsOptional()
  public limit?: number = DefaultMyPurchaseQuery.Limit;

  @IsPositive()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
