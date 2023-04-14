import { Expose, Transform } from 'class-transformer';

export class UserNotifyRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public textNotify: string;

  @Expose()
  public userId: string;
}
