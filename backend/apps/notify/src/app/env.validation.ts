import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { PossiblePort } from '@backend/core';
import { EnvValidationMessage } from './app.constant';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  public MONGO_HOST: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.DBPortRequired,
    }
  )
  @Min(PossiblePort.Min)
  @Max(PossiblePort.Max)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired,
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired,
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired,
  })
  public MONGO_AUTH_BASE: string;

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
  public RABBIT_NOTIFY_SERVICE_WORKOUTS_QUEUE: string;

  @IsString({
    message: EnvValidationMessage.MailServerHostRequired,
  })
  public MAIL_SMTP_HOST: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.MailServerPortRequired,
    }
  )
  @Min(PossiblePort.Min)
  @Max(PossiblePort.Max)
  public MAIL_SMTP_PORT: number;

  @IsString({
    message: EnvValidationMessage.MailServerUserNameRequired,
  })
  public MAIL_USER_NAME: string;

  @IsString({
    message: EnvValidationMessage.MailServerPasswordRequired,
  })
  public MAIL_USER_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.MailServerDefaultFromRequired,
  })
  public MAIL_FROM: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTRequired,
  })
  public JWT_AT_SECRET: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTExpiresRequired,
  })
  public JWT_AT_EXPIRES_IN: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTRequired,
  })
  public REDIS_HOST: string;

  @IsString({
    message: EnvValidationMessage.AccessJWTExpiresRequired,
  })
  public REDIS_PORT: string;
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
