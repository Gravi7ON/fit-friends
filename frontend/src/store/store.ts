import { configureStore } from '@reduxjs/toolkit';
import { createAppApi, RESTService } from 'src/services/app.api';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const usersApi = createAppApi(RESTService.Users);
export const authApi = createAppApi(RESTService.Auth);
export const personalAccountApi = createAppApi(RESTService.PersonalAccount);
export const workoutsApi = createAppApi(RESTService.Workouts);

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
