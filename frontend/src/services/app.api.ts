import axios, { AxiosInstance } from 'axios';
import {
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
  getToken,
  saveToken,
} from './token.stotage';
import { APIRoute } from 'src/constant';

const BackendUrl = {
  Auth: 'http://localhost:3333/api/auth',
  Users: 'http://localhost:3333/api/users',
  PersonalAccount: 'http://localhost:3333/api/personal-account',
  Workouts: 'http://localhost:3334/api/workouts',
  Notify: 'http://localhost:3335/api/workout-subscriber',
} as const;

export enum RESTService {
  Auth = 'Auth',
  Workouts = 'Workouts',
  Users = 'Users',
  PersonalAccount = 'PersonalAccount',
  Notify = 'Notify',
}

const REQUEST_TIMEOUT = 5000;
const UNAUTHORIZED_HTTP_CODE = 401;

export const createAppApi = (direction: RESTService): AxiosInstance => {
  const api = axios.create({
    baseURL: BackendUrl[direction],
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken(ACCESS_TOKEN_KEY_NAME);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;

      if (
        originalConfig.url !== `${BackendUrl.Auth}${APIRoute.SignIn}` &&
        error.response
      ) {
        if (
          error.response.status === UNAUTHORIZED_HTTP_CODE &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          try {
            const refreshToken = getToken(REFRESH_TOKEN_KEY_NAME);
            const { data } = await axios
              .create({
                baseURL: BackendUrl.Auth,
                timeout: REQUEST_TIMEOUT,
              })
              .post(
                APIRoute.RefreshToken,
                {},
                { headers: { Authorization: `Bearer ${refreshToken}` } }
              );
            saveToken(ACCESS_TOKEN_KEY_NAME, data.accessToken);
            saveToken(REFRESH_TOKEN_KEY_NAME, data.refreshToken);
            return api(originalConfig);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};
