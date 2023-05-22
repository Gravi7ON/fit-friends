import { AuthorizationStatus } from 'src/constant';
import { store } from 'src/store/store';
import { Workout } from './workout';
import { User } from './user';
import { Gym } from './gym';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  id: string;
  role: string;
  email: string;
  name: string;
};

export type WorkoutFilterValue = {
  costs: number[];
  ratings: number[];
  calories: number[];
  trainingTimes?: string[];
  specializations?: string[];
  sort?: string;
};

export type UserFilterValue = {
  experiences: string[];
  locations: string[];
  specializations: string[];
  sorts: string[];
};

export type GymFilterValue = {
  features: string[];
  locations: string[];
  costs: number[];
  isOficial: boolean;
};

export type WorkoutState = {
  workouts: Workout[];
  pageNumber: number;
  isFirstLoadingServer: boolean;
  isFirstServerError: null | string;
};

export type GymState = {
  gyms: Gym[];
  pageNumber: number;
  isFirstLoadingServer: boolean;
  isFirstServerError: null | string;
};

export type UserState = {
  users: User[];
  pageNumber: number;
  isFirstLoadingServer: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
