import { TokenPayload } from './token-payload.interface';

export interface CustomHeaders extends Headers {
  authorization?: string;
}

export interface ApiRoute {
  path?: string;
}

export interface RequestWithTokenPayload extends Request {
  user: TokenPayload;
  headers: CustomHeaders;
  route?: ApiRoute;
}
