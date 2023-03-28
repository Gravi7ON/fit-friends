import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtOptions } from '../../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '@backend/shared-types';
import { TokenRepository } from '../../user/token.repository';
import {
  AUTHORIZATION_SCHEMA,
  AuthUserMessageException,
} from '../auth.constant';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>,
    private readonly tokenRepository: TokenRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, payload: TokenPayload) {
    if (
      await this.tokenRepository.findRevokedToken(
        req.headers.authorization.replace(AUTHORIZATION_SCHEMA, '')
      )
    ) {
      throw new UnauthorizedException(AuthUserMessageException.RevokedToken);
    }

    return payload;
  }
}
