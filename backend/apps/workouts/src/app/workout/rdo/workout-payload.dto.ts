import { Expose } from 'class-transformer';

export class WorkoutPayloadRdo {
  @Expose()
  public title: string;

  @Expose()
  public cost: number;

  @Expose()
  public calories: number;

  @Expose()
  public coachId: string;
}
