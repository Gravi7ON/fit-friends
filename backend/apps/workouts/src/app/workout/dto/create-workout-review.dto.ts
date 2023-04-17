import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateWorkoutReviewDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  public workoutId: number;

  @Min(1)
  @Max(5)
  @IsInt()
  @Transform(({ value }) => Number(value))
  public rating: number;

  @MinLength(100)
  @MaxLength(1024)
  public text: string;
}
