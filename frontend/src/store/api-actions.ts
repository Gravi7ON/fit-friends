import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from 'src/constant';
import { AppDispatch, State } from 'src/types/state';
import { redirectToRoute } from './actions';
import { saveToken } from 'src/services/token.stotage';
import { LoginUser } from 'src/types/user';

type ExtraArg = {
  usersApi: AxiosInstance;
  workoutsApi: AxiosInstance;
  personalAccountApi: AxiosInstance;
  authApi: AxiosInstance;
};

export const userLoginAction = createAsyncThunk<
  void,
  LoginUser,
  {
    dispatch: AppDispatch;
    state: State;
    extra: ExtraArg;
  }
>('user/login', async (loginUser, { dispatch, extra, rejectWithValue }) => {
  try {
    const { data } = await extra.authApi.post(APIRoute.SignIn, loginUser);
    saveToken(data.accessToken);
    dispatch(redirectToRoute(AppRoute.Intro));
  } catch (err) {
    const errResponse = (err as AxiosError).response;
    return rejectWithValue(errResponse);
  }
});
