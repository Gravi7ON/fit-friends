export enum UserMessageException {
  NotFound = 'User not found',
  OnlyCustomer = 'Users with role customer only'
}

export enum DefaultUsersQuery {
  Limit = 50,
  Desc = -1
}

export const COACH_COLLECTION_NAME = 'users-coach';
