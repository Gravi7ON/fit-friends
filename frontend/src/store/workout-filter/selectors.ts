import { NameSpaceStore } from 'src/constant';
import { State, WorkoutFilterValue } from 'src/types/state';

export const getWorkoutFilterValue = (state: State): WorkoutFilterValue =>
  state[NameSpaceStore.WorkoutFilter];
