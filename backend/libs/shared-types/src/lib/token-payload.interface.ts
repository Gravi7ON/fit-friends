import { UserRole } from './user-role.enum';

export interface TokenPayload {
  _id: string;
  email: string;
  role: UserRole;
  name: string;
}
