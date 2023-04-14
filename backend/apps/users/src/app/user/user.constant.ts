export enum UserMessageException {
  NotFound = 'User not found',
  OnlyCustomer = 'Users with role customer only',
  OnlyCoach = 'Users with role coach only',
  AlreadyExists = `User's friend with this id already exists`,
  PersonalRequestConflict = `User can't create personal training request to own`,
  PersonalRequestBadStatus = `User can't update request with the same status`,
  PersonalRequestToUserExists = `Your request to this user already exists and has consideration status`,
  PersonalRequestNotFound = `Personal request with this id not found`,
  OnlyLinkedRequest = `User - addressee can update incomming request only`,
}

export enum DefaultUsersQuery {
  Limit = 50,
  Desc = -1,
}

export const COACH_COLLECTION_NAME = 'users-coach';
