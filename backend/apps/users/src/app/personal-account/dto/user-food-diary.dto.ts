import { ArrayMaxSize, ArrayMinSize, IsString } from 'class-validator';

export class UserFoodDiaryDto {
  @ArrayMaxSize(28)
  @ArrayMinSize(28)
  @IsString({
    each: true,
  })
  public calories: string[];
}
