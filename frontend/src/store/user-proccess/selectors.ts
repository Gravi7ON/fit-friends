import { AuthorizationStatus, NameSpaceStore } from 'src/constant';
import { State } from 'src/types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpaceStore.User].authorizationStatus;

export const getUserRole = (state: State): string =>
  state[NameSpaceStore.User].role;
