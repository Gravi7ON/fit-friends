import { TokenPayload } from './token-payload.interface';

export interface RequestWithTokenPayload extends Request {
  user: TokenPayload
}
