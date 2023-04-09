import { Expose } from 'class-transformer';

export class UserFavoriteGymsRdo {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public location: string;

  @Expose()
  public features: string[];

  @Expose()
  public image: string;

  @Expose()
  public description: string;

  @Expose()
  public cost: number;
}
