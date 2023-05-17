import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { WorkoutState } from 'src/types/state';

const initialState: WorkoutState = {
  workouts: [],
};

export const workoutsState = createSlice({
  name: NameSpaceStore.Workouts,
  initialState,
  reducers: {
    setStateWorkouts(state, action) {
      state.workouts = action.payload;
    },
  },
});

export const { setStateWorkouts } = workoutsState.actions;
