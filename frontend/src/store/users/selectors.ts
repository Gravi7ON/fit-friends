import { NameSpaceStore } from 'src/constant';
import { State } from 'src/types/state';
import { User } from 'src/types/user';

export const getUsers = (state: State): User[] =>
  state[NameSpaceStore.Users].users;

export const getPageNumber = (state: State): number =>
  state[NameSpaceStore.Users].pageNumber;

export const getServerLoadingStatus = (state: State): boolean =>
  state[NameSpaceStore.Users].isFirstLoadingServer;
