import { IsMongoId } from 'class-validator';

export class CreatePersonalTrainingRequestDto {
  @IsMongoId()
  public toUserId: string;
}
