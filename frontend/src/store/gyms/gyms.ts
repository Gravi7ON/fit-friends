import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { GymState } from 'src/types/state';

const initialState: GymState = {
  gyms: [],
  pageNumber: 1,
  isFirstLoadingServer: false,
  isFirstServerError: null,
};

export const gymsState = createSlice({
  name: NameSpaceStore.Gyms,
  initialState,
  reducers: {
    setStateGyms(state, action) {
      state.gyms = action.payload;
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
  setStateGyms,
  setStatePageNumber,
  setStateLoadingServer,
  setStateErrorServer,
} = gymsState.actions;
