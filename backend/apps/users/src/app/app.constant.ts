export const ENV_FILE_PATH = '../../environments/.users.env';

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  AccessJWTRequired = 'Access JWT secret is required',
  RefreshJWTRequired = 'Refresh JWT secret is required',
  RefreshJWTExpiresRequired = 'Refresh JWT expires is required',
  AccessJWTExpiresRequired = 'Access JWT expires is required',
  WorkoutsServicePort = 'Workouts service port is required',
}
