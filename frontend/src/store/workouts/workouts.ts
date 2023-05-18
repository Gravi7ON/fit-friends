import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { WorkoutState } from 'src/types/state';

const initialState: WorkoutState = {
  workouts: [],
  pageNumber: 1,
  isFirstLoadingServer: false,
  isFirstServerError: null,
};

export const workoutsState = createSlice({
  name: NameSpaceStore.Workouts,
  initialState,
  reducers: {
    setStateWorkouts(state, action) {
      state.workouts = action.payload;
    },
    setStatePageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setStateLoadingServer(state, action) {
      state.isFirstLoadingServer = action.payload;
    },
    setStateErrorServer(state, action) {
      state.isFirstServerError = action.payload;
    },
  },
});

export const {
  setStateWorkouts,
  setStatePageNumber,
  setStateLoadingServer,
  setStateErrorServer,
} = workoutsState.actions;
