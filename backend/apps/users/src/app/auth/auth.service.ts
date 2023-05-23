import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import {
  RequestWithTokenPayload,
  RequestWithUser,
  TokenPayload,
  User,
  UserCustomer,
  UserRole,
  UserCoach,
} from '@backend/shared-types';
import { UserEntity } from '../user/entities/user.entity';
import {
  AUTHORIZATION_SCHEMA,
  AuthUserMessageException,
} from './auth.constant';
import { UserCustomerEntity } from '../user/entities/user-customer.entity';
import { UserCoachEntity } from '../user/entities/user-coach.entity';
import { AddUserInfoDto } from './dto/add-user-info.dto';
import { jwtOptions } from '../../config/jwt.config';
import { TokenRepository } from '../user/token.repository';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>
  ) {}

  async register(dto: CreateUserDto, request: RequestWithTokenPayload) {
    if (request.headers.authorization) {
      const accessToken = request.headers.authorization.replace(
        AUTHORIZATION_SCHEMA,
        ''
      );

      try {
        this.jwtService.verify(accessToken, {
          secret: this.jwtConfig.accessTokenSecret,
        });
        throw new ForbiddenException(
          AuthUserMessageException.AlreadyRegisterAndAuth
        );
      } catch (err) {
        throw new UnauthorizedException(err.cause);
      }
    }

    const user: User = {
      ...dto,
      dateBirth: dto.dateBirth
        ? dayjs.tz(dto.dateBirth, 'Europe/London').toDate()
        : null,
    };

    const existUser = await this.userRepository.findByEmail(user.email);

    if (existUser) {
      throw new ConflictException(AuthUserMessageException.Exists);
    }

    const userEntity = await new UserEntity(user).hashPassword(user.password);

    return this.userRepository.create(userEntity);
  }

  async addUserInfo(id: string, dto: AddUserInfoDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new ConflictException(AuthUserMessageException.NotFound);
    }

    let userEntity: UserCustomerEntity & UserCoachEntity;

    switch (existUser.role) {
      case UserRole.Coach:
        userEntity = new UserCoachEntity(existUser);
        userEntity.certificates.push(dto.certificates);
        userEntity.addInfoEntity({
          ...existUser,
          ...dto,
        });
        break;
      case UserRole.Customer:
        userEntity = new UserCustomerEntity(existUser);
        userEntity.addInfoEntity({
          ...existUser,
          ...dto,
        });
    }

    return this.userRepository.update(id, userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessageException.NotFound);
    }

    let userEntity: UserCustomerEntity & UserCoachEntity;

    switch (existUser.role) {
      case UserRole.Coach:
        userEntity = new UserCoachEntity(existUser);
        return await getVerifyUser(userEntity, password);
      case UserRole.Customer:
        userEntity = new UserCustomerEntity(existUser);
        return await getVerifyUser(userEntity, password);
    }
  }

  async loginUser(request: RequestWithUser | RequestWithTokenPayload) {
    if (request.headers.authorization) {
      const accessToken = request.headers.authorization.replace(
        AUTHORIZATION_SCHEMA,
        ''
      );

      try {
        await this.jwtService.verify(accessToken, {
          secret: this.jwtConfig.accessTokenSecret,
        });
      } catch (err) {
        throw new UnauthorizedException(err.cause);
      }

      const refreshToken = (
        await this.tokenRepository.findToken(request.user._id)
      )?.refreshToken;

      return {
        accessToken,
        refreshToken,
      };
    }

    const user: Pick<User, '_id' | 'email' | 'role' | 'name'> = request.user;
    const payload: TokenPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      }),
    ]);

    await Promise.all([
      this.tokenRepository.destroyToken(request.user._id),
      this.tokenRepository.saveToken(user._id, refreshToken),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccess(request: RequestWithUser | RequestWithTokenPayload) {
    const userSentRefreshToken = request.headers.authorization.replace(
      AUTHORIZATION_SCHEMA,
      ''
    );

    const user: Pick<User, '_id' | 'email' | 'role' | 'name'> = request.user;
    const payload: TokenPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const [accessToken, refreshToken, existedToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      }),
      this.tokenRepository.findToken(request.user._id),
    ]);

    if (existedToken?.refreshToken === userSentRefreshToken) {
      await this.tokenRepository.destroyToken(request.user._id);
    } else {
      throw new UnauthorizedException(AuthUserMessageException.BadRefreshToken);
    }
    await this.tokenRepository.saveToken(user._id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async revokeToken(request: RequestWithTokenPayload) {
    const existedToken = await this.tokenRepository.findToken(request.user._id);

    if (!existedToken) {
      throw new BadRequestException(AuthUserMessageException.MissingToken);
    }

    await Promise.all([
      this.tokenRepository.destroyToken(request.user._id),
      this.tokenRepository.saveRevokedToken(existedToken.refreshToken),
    ]);
  }
}

const getVerifyUser = async function (
  entity: UserCustomerEntity | UserCoachEntity,
  password: string
): Promise<UserCustomer | UserCoach> {
  if (!(await entity.comparePassword(password))) {
    throw new BadRequestException(AuthUserMessageException.PasswordWrong);
  }
  return entity.toObject();
};
