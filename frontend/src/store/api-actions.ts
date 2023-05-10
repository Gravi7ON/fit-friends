import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import jwt_decode from 'jwt-decode';
import { APIRoute, AppRoute } from 'src/constant';
import { AppDispatch, State } from 'src/types/state';
import { redirectToRoute } from './actions';
import {
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
  saveToken,
} from 'src/services/token.stotage';
import { CreateUser, LoginUser, User, UserRole } from 'src/types/user';
import { TokenPayload } from 'src/types/token';

type ExtraArg = {
  usersApi: AxiosInstance;
  workoutsApi: AxiosInstance;
  personalAccountApi: AxiosInstance;
  authApi: AxiosInstance;
};

export const userRegisterAction = createAsyncThunk<
  User,
  CreateUser,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ExtraArg;
  }
>('user/register', async (createUser, { dispatch, extra, rejectWithValue }) => {
  try {
    const { data } = await extra.authApi.post(APIRoute.SignUp, createUser);
    const { data: token } = await extra.authApi.post(APIRoute.SignIn, {
      email: createUser.email,
      password: createUser.password,
    });
    saveToken(ACCESS_TOKEN_KEY_NAME, token.accessToken);
    saveToken(REFRESH_TOKEN_KEY_NAME, token.refreshToken);
    return data;
  } catch (err) {
    const errResponse = (err as AxiosError).response;
    return rejectWithValue(errResponse);
  }
});

export const userLoginAction = createAsyncThunk<
  TokenPayload,
  LoginUser,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ExtraArg;
  }
>('user/login', async (loginUser, { dispatch, extra, rejectWithValue }) => {
  try {
    const { data } = await extra.authApi.post(APIRoute.SignIn, loginUser);
    saveToken(ACCESS_TOKEN_KEY_NAME, data.accessToken);
    saveToken(REFRESH_TOKEN_KEY_NAME, data.refreshToken);
    const decodedToken: TokenPayload = jwt_decode(data.accessToken);
    decodedToken.role === UserRole.Customer
      ? dispatch(redirectToRoute(AppRoute.Main))
      : dispatch(redirectToRoute(AppRoute.PersonalCoach));
    return decodedToken;
  } catch (err) {
    const errResponse = (err as AxiosError).response;
    return rejectWithValue(errResponse);
  }
});
