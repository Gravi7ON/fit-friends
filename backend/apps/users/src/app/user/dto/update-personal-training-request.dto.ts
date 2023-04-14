import { PersonalTrainingStatus } from '@backend/shared-types';
import { IsEnum, IsMongoId } from 'class-validator';

export class UpdatePersonalTrainingRequestDto {
  @IsMongoId()
  public requestId: string;

  @IsEnum(PersonalTrainingStatus)
  public requestStatus: PersonalTrainingStatus;
}
