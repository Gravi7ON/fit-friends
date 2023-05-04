import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpaceStore } from 'src/constant';
import { userLoginAction } from '../api-actions';
import { UserProcess } from 'src/types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpaceStore.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLoginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(userLoginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
