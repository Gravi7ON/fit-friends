import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvValidationMessage}  from './app.constant';
import { PossiblePort } from '@backend/core';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(PossiblePort.Min)
  @Max(PossiblePort.Max)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTRequired
  })
  public JWT_AT_SECRET: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTExpiresRequired
  })
  public JWT_AT_EXPIRES_IN: string;

  @IsString({
    message: EnvValidationMessage.RefreshJWTRequired
  })
  public JWT_RT_SECRET: string;

  @IsString({
    message: EnvValidationMessage.RefreshJWTExpiresRequired
  })
  public JWT_RT_EXPIRES_IN: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
