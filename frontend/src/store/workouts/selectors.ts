import { NameSpaceStore } from 'src/constant';
import { State } from 'src/types/state';
import { Workout } from 'src/types/workout';

export const getWorkouts = (state: State): Workout[] =>
  state[NameSpaceStore.Workouts].workouts;
