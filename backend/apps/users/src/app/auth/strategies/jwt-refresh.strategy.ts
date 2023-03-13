import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { jwtOptions } from '../../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '@backend/shared-types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: TokenPayload) {
    return payload;
  }
}
