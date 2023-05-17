import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { WorkoutFilterValue } from 'src/types/state';

const initialState: WorkoutFilterValue = {
  costs: [],
  rating: [],
  calories: [],
};

export const workoutFilter = createSlice({
  name: NameSpaceStore.WorkoutFilter,
  initialState,
  reducers: {
    changeWorkoutFilterValue(state, action) {
      state.calories = action.payload.calories;
      state.costs = action.payload.costs;
      state.rating = action.payload.rating;
    },
  },
});

export const { changeWorkoutFilterValue } = workoutFilter.actions;
