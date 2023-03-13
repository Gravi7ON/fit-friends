export enum AuthUserMessageException {
  Exists = 'User with this email already exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  ForbiddenAddInfo = 'The user registration proccess is complete, you can update only'
}
