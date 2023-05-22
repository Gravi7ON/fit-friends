import { NameSpaceStore } from 'src/constant';
import { State, UserFilterValue } from 'src/types/state';

export const getUserFilterValue = (state: State): UserFilterValue =>
  state[NameSpaceStore.UserFilter];
