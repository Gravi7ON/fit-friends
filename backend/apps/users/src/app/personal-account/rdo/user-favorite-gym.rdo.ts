import { Expose, Transform } from 'class-transformer';

export class UserFavoriteGymRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public favoriteGymId: number;

  @Expose()
  public userId: string;
}
