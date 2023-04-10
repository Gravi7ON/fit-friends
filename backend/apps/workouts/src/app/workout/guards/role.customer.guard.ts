import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '@backend/shared-types';
import { WorkoutMessageException } from '../workout.constant';

@Injectable()
export class RoleCustomerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;

    if (userRole !== UserRole.Customer) {
      throw new ForbiddenException(WorkoutMessageException.OnlyCustomer);
    }

    return true;
  }
}
