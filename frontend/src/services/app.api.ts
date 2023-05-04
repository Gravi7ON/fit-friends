import axios, { AxiosInstance } from 'axios';
import { getToken } from './token.stotage';

const BackendUrl = {
  Auth: 'http://localhost:3333/api/auth',
  Users: 'http://localhost:3333/api/users',
  PersonalAccount: 'http://localhost:3333/api/personal-account',
  Workouts: 'http://localhost:3334/api/workouts',
} as const;

export enum RESTService {
  Auth = 'Auth',
  Workouts = 'Workouts',
  Users = 'Users',
  PersonalAccount = 'PersonalAccount',
}

const REQUEST_TIMEOUT = 5000;

export const createUserAPI = (direction: RESTService): AxiosInstance => {
  const api = axios.create({
    baseURL: BackendUrl[direction],
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};
