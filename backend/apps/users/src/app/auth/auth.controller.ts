import { Body, Controller,HttpCode,HttpStatus,Param,Patch,Post, Request, UseGuards } from '@nestjs/common';
import { fillObject } from '@backend/core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatedUserRdo } from './rdo/created-user.rdo';
import { RequestWithTokenPayload, RequestWithUser, UserRole } from '@backend/shared-types';
import { UserTrainerRdo } from '../user/rdo/user-trainer.rdo';
import { UserCustomerRdo } from '../user/rdo/user-customer.rdo';
import { AddUserInfoGuard } from './guards/add-user-info.guard';
import { AddUserInfoDto } from './dto/add-user-info.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../common-guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillObject(CreatedUserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() request: RequestWithUser) {
    return this.authService.loginUser(request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async revoke(@Request() request: RequestWithTokenPayload) {
    return this.authService.revokeToken(request);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() request: RequestWithTokenPayload) {
    return this.authService.loginUser(request);
  }

  @UseGuards(AddUserInfoGuard)
  @Patch('additional-info/:id')
  async addUserInfo(
    @Param('id') id: string,
    @Body() dto: AddUserInfoDto
  ) {
    const existedUser = await this.authService.addUserInfo(id, dto);

    return existedUser.role === UserRole.Trainer ?
      fillObject(UserTrainerRdo, existedUser) :
      fillObject(UserCustomerRdo, existedUser);
  }
}
