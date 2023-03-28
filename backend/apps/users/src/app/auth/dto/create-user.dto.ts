import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserLocation, UserRole, UserSex } from '@backend/shared-types';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  @Matches(/[a-zа-яё\s]+/i)
  public name: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/)
  public avatar?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;

  @IsString()
  @IsEnum(UserSex)
  public sex: UserSex;

  @IsOptional()
  @IsDateString()
  public dateBirth?: Date;

  @IsString()
  @IsEnum(UserRole)
  public role: UserRole;

  @IsString()
  @IsEnum(UserLocation)
  public location: UserLocation;

  @IsOptional()
  @IsString()
  public about?: string;
}
