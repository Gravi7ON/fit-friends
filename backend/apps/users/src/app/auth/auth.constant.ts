export enum AuthUserMessageException {
  Exists = 'User with this email already exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  ForbiddenAddInfo = 'The user registration proccess is complete, you can update only',
  RevokedToken = 'This token has been revoked',
  MissingToken = 'Missing authorization token'
}

export const AUTHORIZATION_SCHEMA = 'Bearer ';

export const REQUEST_LOGIN_PATH = '/api/auth/login'
