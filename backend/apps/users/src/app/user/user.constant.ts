export enum UserMessageException {
  NotFound = 'User not found',
  OnlyCustomer = 'Users with role customer only',
  OnlyCoach = 'Users with role coach only',
  AlreadyExists = `User's friend with this id already exists`,
}

export enum DefaultUsersQuery {
  Limit = 50,
  Desc = -1,
}

export const COACH_COLLECTION_NAME = 'users-coach';
