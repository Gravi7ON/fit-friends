import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpaceStore } from 'src/constant';
import { userLoginAction, userRegisterAction } from '../api-actions';
import { UserProcess } from 'src/types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  id: '',
  name: '',
  role: '',
  email: '',
};

export const userProcess = createSlice({
  name: NameSpaceStore.User,
  initialState,
  reducers: {
    checkUserAuth(state, action) {
      const {
        _id: id,
        name,
        role,
        email,
        authorizationStatus,
      } = action.payload;
      state.authorizationStatus =
        authorizationStatus ?? initialState.authorizationStatus;
      state.id = id ?? initialState.id;
      state.email = email ?? initialState.email;
      state.name = name ?? initialState.name;
      state.role = role ?? initialState.role;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLoginAction.fulfilled, (state, action) => {
        const { _id: id, name, role, email } = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.id = id;
        state.email = email;
        state.name = name;
        state.role = role;
      })
      .addCase(userLoginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(userRegisterAction.fulfilled, (state, action) => {
        const { id, name, role, email } = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.id = id;
        state.email = email;
        state.name = name;
        state.role = role;
      })
      .addCase(userRegisterAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const { checkUserAuth } = userProcess.actions;
