import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUserMessageException } from '../auth.constant';

export class LoginUserDto {
  @IsEmail(
    {},
    {message: AuthUserMessageException.EmailNotValid as string}
  )
  public email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;
}
