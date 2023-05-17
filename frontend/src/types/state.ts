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
  rating: number[];
  calories: number[];
};

export type WorkoutState = {
  workouts: Workout[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
