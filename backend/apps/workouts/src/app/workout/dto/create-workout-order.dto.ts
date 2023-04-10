import { IsIn, IsInt, IsNumber, Max, Min } from 'class-validator';

export class CreateWorkoutOrderDto {
  @IsIn(['тренировка', 'абонемент'])
  public type: string;

  @IsNumber()
  public workoutId: number;

  @IsInt()
  public cost: number;

  @Min(1)
  @Max(50)
  public amountWorkout: number;

  @IsIn(['visa', 'mir', 'umoney'])
  public payment: string;
}
