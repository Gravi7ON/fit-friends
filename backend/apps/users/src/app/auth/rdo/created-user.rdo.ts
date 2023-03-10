import { Expose, Transform } from 'class-transformer';

export class CreatedUserRdo {
  @Expose()
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public sex: string;

  @Expose()
  public dateBirth: string | null;

  @Expose()
  public role: string;

  @Expose()
  public location: string;

  @Expose()
  public about: string;
}
