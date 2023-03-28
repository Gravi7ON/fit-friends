import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRole } from '@backend/shared-types';
import { BAD_MONGOID_ERROR } from '@backend/core';
import { UserMessageException } from '../user/user.constant';

@Injectable()
export class RoleCoachGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;
    const userMongoId = request.user._id;

    if (userRole !== UserRole.Coach) {
      throw new ForbiddenException(UserMessageException.OnlyCoach);
    }

    if (!Types.ObjectId.isValid(userMongoId)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return true;
  }
}
