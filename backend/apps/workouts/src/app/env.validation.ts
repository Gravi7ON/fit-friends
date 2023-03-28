import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvValidationMessage } from './app.constant';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.AccessJWTRequired,
  })
  public JWT_AT_SECRET: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTExpiresRequired,
  })
  public JWT_AT_EXPIRES_IN: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(EnvironmentsConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentsConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
