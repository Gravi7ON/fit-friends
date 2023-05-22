import { NameSpaceStore } from 'src/constant';
import { Gym } from 'src/types/gym';
import { State } from 'src/types/state';

export const getGyms = (state: State): Gym[] => state[NameSpaceStore.Gyms].gyms;

export const getPageNumber = (state: State): number =>
  state[NameSpaceStore.Gyms].pageNumber;

export const getServerLoadingStatus = (state: State): boolean =>
  state[NameSpaceStore.Gyms].isFirstLoadingServer;

export const getServerErrorStatus = (state: State): null | string =>
  state[NameSpaceStore.Gyms].isFirstServerError;
