export const ENV_FILE_PATH = '../../environments/.workouts.env';

export enum EnvValidationMessage {
  AccessJWTRequired = 'Access JWT secret is required',
  AccessJWTExpiresRequired = 'Access JWT expires is required',
  PortRequired = 'Application port is required',
}
