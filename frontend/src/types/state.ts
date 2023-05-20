import { AuthorizationStatus } from 'src/constant';
import { store } from 'src/store/store';
import { Workout } from './workout';

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

export type WorkoutState = {
  workouts: Workout[];
  pageNumber: number;
  isFirstLoadingServer: boolean;
  isFirstServerError: null | string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
