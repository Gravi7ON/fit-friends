import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { User } from '@backend/shared-types';
import { UserEntity } from '../user/entities/user.entity';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async register(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      dateBirth: dto.dateBirth ? dayjs.tz(dto.dateBirth, 'Europe/London').toDate() : null
    };

    // const existUser = await this.userRepository.findByEmail(user.email);

    // if (existUser) {
    //   throw new ConflictException(AuthUserMessageException.Exists)
    // }

    const userEntity = await new UserEntity(user)
      .hashPassword(user.password);

    return this.userRepository.create(userEntity);
  }
}
