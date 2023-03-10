import { Body, Controller,Post } from '@nestjs/common';
import { fillObject } from '@backend/core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatedUserRdo } from './rdo/created-user.rdo';

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
}
