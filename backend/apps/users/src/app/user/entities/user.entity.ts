import { User, UserLocation, UserRole, UserSex } from '@backend/shared-types';
import { genSalt, compare, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public avatar?: string;
  public password: string;
  public sex: UserSex;
  public dateBirth: Date;
  public role: UserRole;
  public location: UserLocation;
  public about?: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {
      ...this
    }
  }

  public async hashPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.password = user.password;
    this.sex = user.sex;
    this.dateBirth = user.dateBirth;
    this.role = user.role;
    this.location = user.location;
    this.about = user.about;
  }
}
