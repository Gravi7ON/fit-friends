import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { userProcess } from './user-proccess/user-proccess';
import { workoutFilter } from './workout-filter/workout-filter';
import { workoutsState } from './workouts/workouts';

export const rootReducer = combineReducers({
  [NameSpaceStore.User]: userProcess.reducer,
  [NameSpaceStore.WorkoutFilter]: workoutFilter.reducer,
  [NameSpaceStore.Workouts]: workoutsState.reducer,
});
