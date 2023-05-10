import { AuthorizationStatus } from 'src/constant';
import { store } from 'src/store/store';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  id: string;
  role: string;
  email: string;
  name: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
