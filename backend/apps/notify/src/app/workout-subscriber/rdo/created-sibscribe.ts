import { Expose, Transform } from 'class-transformer';

export class CreatedSibscribeRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public subscribeCoachId: string;
}
