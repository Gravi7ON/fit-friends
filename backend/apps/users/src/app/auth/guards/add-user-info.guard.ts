import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { BAD_MONGOID_ERROR } from '@backend/core';
import { UserRole } from '@backend/shared-types';
import { UserRepository } from '../../user/user.repository';
import { AuthUserMessageException } from '../auth.constant';

const ALL_EMPTY_ADDITIONAL_TRAINER_FIELDS = 5;
const ALL_EMPTY_ADDITIONAL_CUSTOMER_FIELDS = 6;

@Injectable()
export class AddUserInfoGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;

    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    const existUser = await this.userRepository.findById(userId);
    const {
      experience,
      specializations,
      certificates,
      achievement,
      isIndividualTraining,
      trainingTime,
      targetDeclineСalories,
      dayDeclineCalories,
      isReadyTraining
    } = existUser;
    const additionalTrainerFields = [
      experience,
      specializations?.length,
      certificates?.length,
      achievement,
      isIndividualTraining
    ];
    const additionalCustomerFields = [
      experience,
      specializations?.length,
      trainingTime,
      targetDeclineСalories,
      dayDeclineCalories,
      isReadyTraining
    ];

    switch(existUser.role) {
      case UserRole.Trainer:
        if(
          additionalTrainerFields
            .filter((item) => !item).length === ALL_EMPTY_ADDITIONAL_TRAINER_FIELDS
        ) {
          return true;
        } else {
          throw new ForbiddenException(AuthUserMessageException.ForbiddenAddInfo);
        }
      case UserRole.Customer:
        if(
          additionalCustomerFields
            .filter((item) => !item).length === ALL_EMPTY_ADDITIONAL_CUSTOMER_FIELDS
        ) {
          return true;
        } else {
          throw new ForbiddenException(AuthUserMessageException.ForbiddenAddInfo);
        }
    }
  }
}
