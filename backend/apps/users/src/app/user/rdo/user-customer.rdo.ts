import { Expose, Transform } from 'class-transformer';

export class UserCustomerRdo {
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

  @Expose()
  public experience: string;

  @Expose()
  public specializations: string[];

  @Expose()
  public trainingTime: string;

  @Expose()
  public targetDeclineСalories: number;

  @Expose()
  public dayDeclineCalories: number;

  @Expose()
  public isReadyTraining: boolean;
}
