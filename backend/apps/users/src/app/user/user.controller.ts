import { Body, Controller, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { fillObject } from '@backend/core';
import { RequestWithTokenPayload, UserRole } from '@backend/shared-types';
import { JwtAuthGuard } from '../common-guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../common-pipes/mongoid-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCustomerRdo } from './rdo/user-customer.rdo';
import { UserTrainerRdo } from './rdo/user-trainer.rdo';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id', MongoidValidationPipe) id: string) {
    const existedUser = await this.userService.findUser(id);

    return existedUser.role === UserRole.Trainer ?
      fillObject(UserTrainerRdo, existedUser) :
      fillObject(UserCustomerRdo, existedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  async updateUser(
    @Request() request: RequestWithTokenPayload,
    @Body() dto: UpdateUserDto
  ) {
    const userId = request.user.sub;
    const existedUser = await this.userService.updateUser(userId, dto);

    return existedUser.role === UserRole.Trainer ?
      fillObject(UserTrainerRdo, existedUser) :
      fillObject(UserCustomerRdo, existedUser);
  }
}
