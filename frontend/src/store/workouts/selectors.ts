import { NameSpaceStore } from 'src/constant';
import { State } from 'src/types/state';
import { Workout } from 'src/types/workout';

export const getWorkouts = (state: State): Workout[] =>
  state[NameSpaceStore.Workouts].workouts;

export const getPageNumber = (state: State): number =>
  state[NameSpaceStore.Workouts].pageNumber;

export const getServerLoadingStatus = (state: State): boolean =>
  state[NameSpaceStore.Workouts].isFirstLoadingServer;

export const getServerErrorStatus = (state: State): null | string =>
  state[NameSpaceStore.Workouts].isFirstServerError;
