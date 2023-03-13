import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserCustomer, UserTrainer } from '@backend/shared-types';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: USERNAME_FIELD_NAME
    });
  }

  public async validate(email: string, password: string): Promise<UserCustomer | UserTrainer> {
    return this.authService.verifyUser({email, password});
  }
}
