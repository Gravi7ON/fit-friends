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

  @IsString({
    message: EnvValidationMessage.PortUsersRequired,
  })
  public USERS_PORT: string;

  @IsString({
    message: EnvValidationMessage.RMQUserRequired,
  })
  public RABBIT_USER: string;

  @IsString({
    message: EnvValidationMessage.RMQPasswordRequired,
  })
  public RABBIT_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.RMQHostRequired,
  })
  public RABBIT_HOST: string;

  @IsString({
    message: EnvValidationMessage.RMQSubscriberQueue,
  })
  public RABBIT_WORKOUTS_SERVICE_WORKOUTS_QUEUE: string;
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
