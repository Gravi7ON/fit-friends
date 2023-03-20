export const ENV_FILE_PATH = '../../environments/.users.env';

export enum EnvValidationMessage {
  AccessJWTRequired = 'Access JWT secret is required',
  AccessJWTExpiresRequired = 'Access JWT expires is required'
}
