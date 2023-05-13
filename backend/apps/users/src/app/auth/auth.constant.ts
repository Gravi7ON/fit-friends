export enum AuthUserMessageException {
  Exists = 'User with this email already exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  ForbiddenAddInfo = 'The user registration proccess is complete, you can update only',
  RevokedToken = 'This token has been revoked',
  MissingToken = 'Missing authorization token',
  BadRefreshToken = 'Refresh token is not match with yours',
  AlreadyRegisterAndAuth = 'You already register and authorized, if you have to a new profile, you should send request without autorization header',
}

export const AUTHORIZATION_SCHEMA = 'Bearer ';
