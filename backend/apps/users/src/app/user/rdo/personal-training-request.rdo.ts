import { Expose, Transform } from 'class-transformer';

export class PersonalTrainingRequestRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public fromUserId: string;

  @Expose()
  public toUserId: string;

  @Expose()
  public requestStatus: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;
}
