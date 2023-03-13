import { UserRole } from '@backend/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCustomerEntity } from './entities/user-customer.entity';
import { UserTrainerEntity } from './entities/user-trainer.entity';
import { UserMessageException } from './user.constant';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserMessageException.NotFound);
    }

    return existUser;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const existUser = await this.findUser(id);

    let userEntity : UserCustomerEntity & UserTrainerEntity;

    switch(existUser.role) {
      case UserRole.Trainer:
        userEntity = new UserTrainerEntity(existUser);
        dto.certificates ? userEntity.certificates.push(dto.certificates) : null;
        userEntity.updateEntity({
          ...existUser,
          ...dto
        });
        break;
      case UserRole.Customer:
        userEntity = new UserCustomerEntity(existUser);
        userEntity.updateEntity({
          ...existUser,
          ...dto
        });
    }

    const updatedUser = await this.userRepository.update(id, userEntity)

    return updatedUser;
  }
}
