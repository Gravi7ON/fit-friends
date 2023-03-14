import { ApiRoute, CustomHeaders } from './request-with-token-payload.interface';
import { User } from './user.interface';

export interface RequestWithUser extends Request {
  user: User;
  headers: CustomHeaders;
  route?: ApiRoute;
}
