import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { TokenPayload, User, UserCustomer, UserRole, UserTrainer } from '@backend/shared-types';
import { UserEntity } from '../user/entities/user.entity';
import { AuthUserMessageException } from './auth.constant';
import { UserCustomerEntity } from '../user/entities/user-customer.entity';
import { UserTrainerEntity } from '../user/entities/user-trainer.entity';
import { AddUserInfoDto } from './dto/add-user-info.dto';
import { jwtOptions } from '../../config/jwt.config';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>
  ) {}

  async register(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      dateBirth: dto.dateBirth ? dayjs.tz(dto.dateBirth, 'Europe/London').toDate() : null
    };

    const existUser = await this.userRepository.findByEmail(user.email);

    if (existUser) {
      throw new ConflictException(AuthUserMessageException.Exists);
    }

    const userEntity = await new UserEntity(user)
      .hashPassword(user.password);

    return this.userRepository.create(userEntity);
  }

  async addUserInfo(id: string, dto: AddUserInfoDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new ConflictException(AuthUserMessageException.NotFound);
    }

    let userEntity : UserCustomerEntity & UserTrainerEntity;

    switch(existUser.role) {
      case UserRole.Trainer:
        userEntity = new UserTrainerEntity(existUser);
        userEntity.certificates.push(dto.certificates);
        userEntity.addInfoEntity({
          ...existUser,
          ...dto
        });
        break;
      case UserRole.Customer:
        userEntity = new UserCustomerEntity(existUser);
        userEntity.addInfoEntity({
          ...existUser,
          ...dto
        });
    }

    return this.userRepository.update(id, userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessageException.NotFound);
    }

    let userEntity : UserCustomerEntity & UserTrainerEntity;

    switch(existUser.role) {
      case UserRole.Trainer:
        userEntity = new UserTrainerEntity(existUser);
        return await getVerifyUser(userEntity, password);
      case UserRole.Customer:
        userEntity = new UserCustomerEntity(existUser);
        return await getVerifyUser(userEntity, password);
    }
  }

  async loginUser(user:  Pick<User, '_id' | 'email' | 'role' | 'name'>) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      })
    };
  }
}

const getVerifyUser = async function(entity: UserCustomerEntity | UserTrainerEntity, password: string): Promise<UserCustomer | UserTrainer> {
  if (!await entity.comparePassword(password)) {
    throw new BadRequestException(AuthUserMessageException.PasswordWrong);
  }
  return entity.toObject();
}
