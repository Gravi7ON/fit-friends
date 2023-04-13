export const ENV_FILE_PATH = '../../environments/.workouts.env';

export enum EnvValidationMessage {
  AccessJWTRequired = 'Access JWT secret is required',
  AccessJWTExpiresRequired = 'Access JWT expires is required',
  PortUsersRequired = 'Application users port is required',
  RMQHostRequired = 'RabbitMQ host is required',
  RMQUserRequired = 'RabbitMQ user is required',
  RMQPasswordRequired = 'RabbitMQ password is required',
  RMQSubscriberQueue = 'RabbitMQ Subscribers Queue is required',
}
