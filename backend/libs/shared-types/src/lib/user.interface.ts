import { UserLocation } from './user-location.enum';
import { UserRole } from './user-role.enum';
import { UserSex } from './user-sex.enum';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  sex: UserSex;
  dateBirth?: Date | null;
  role: UserRole;
  location: UserLocation;
  about?: string;
}
