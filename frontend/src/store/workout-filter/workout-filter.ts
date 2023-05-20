import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { WorkoutFilterValue } from 'src/types/state';

const initialState: WorkoutFilterValue = {
  costs: [],
  ratings: [],
  calories: [],
  trainingTimes: [],
  specializations: [],
  sort: '',
};

export const workoutFilter = createSlice({
  name: NameSpaceStore.WorkoutFilter,
  initialState,
  reducers: {
    changeWorkoutFilterValue(state, action) {
      state.calories = action.payload.calories;
      state.costs = action.payload.costs;
      state.ratings = action.payload.ratings;
      state.trainingTimes = action.payload.trainingTimes;
      state.specializations = action.payload.specializations;
      state.sort = action.payload.sort;
    },
  },
});

export const { changeWorkoutFilterValue } = workoutFilter.actions;
