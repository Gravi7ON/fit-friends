import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { UserState } from 'src/types/state';

const initialState: UserState = {
  users: [],
  pageNumber: 1,
  isFirstLoadingServer: false,
};

export const usersState = createSlice({
  name: NameSpaceStore.Users,
  initialState,
  reducers: {
    setStateUsers(state, action) {
      state.users = action.payload;
    },
    setStatePageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setStateLoadingServer(state, action) {
      state.isFirstLoadingServer = action.payload;
    },
  },
});

export const { setStateUsers, setStatePageNumber, setStateLoadingServer } =
  usersState.actions;
