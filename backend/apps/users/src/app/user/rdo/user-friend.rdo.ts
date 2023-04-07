import { Expose, Transform } from 'class-transformer';

export class UserFriendRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public friendId: string;
}
