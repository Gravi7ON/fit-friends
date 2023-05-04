import { configureStore } from '@reduxjs/toolkit';
import { createUserAPI, RESTService } from 'src/services/app.api';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const usersApi = createUserAPI(RESTService.Users);
export const authApi = createUserAPI(RESTService.Auth);
export const personalAccountApi = createUserAPI(RESTService.PersonalAccount);
export const workoutsApi = createUserAPI(RESTService.Workouts);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload'],
      },
      thunk: {
        extraArgument: {
          authApi,
          personalAccountApi,
          usersApi,
          workoutsApi,
        },
      },
    }).concat(redirect),
});
