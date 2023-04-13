import { IsMongoId } from 'class-validator';

export class CreateSubscribeDto {
  @IsMongoId()
  subscribeCoachId: string;
}
