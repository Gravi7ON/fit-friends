import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { UserFilterValue } from 'src/types/state';

const initialState: UserFilterValue = {
  locations: [],
  sorts: [],
  experiences: [],
  specializations: [],
};

export const userFilter = createSlice({
  name: NameSpaceStore.UserFilter,
  initialState,
  reducers: {
    changeUserFilterValue(state, action) {
      state.locations = action.payload.locations;
      state.experiences = action.payload.experiences;
      state.sorts = action.payload.sorts;
      state.specializations = action.payload.specializations;
    },
  },
});

export const { changeUserFilterValue } = userFilter.actions;
