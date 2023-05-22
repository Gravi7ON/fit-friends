import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { GymFilterValue } from 'src/types/state';

const initialState: GymFilterValue = {
  locations: [],
  costs: [],
  features: [],
  isOficial: false,
};

export const gymFilter = createSlice({
  name: NameSpaceStore.UserFilter,
  initialState,
  reducers: {
    changeGymFilterValue(state, action) {
      state.locations = action.payload.locations;
      state.costs = action.payload.costs;
      state.features = action.payload.features;
      state.isOficial = action.payload.isOficial;
    },
  },
});

export const { changeGymFilterValue } = gymFilter.actions;
