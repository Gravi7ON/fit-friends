import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { userProcess } from './user-proccess/user-proccess';

export const rootReducer = combineReducers({
  [NameSpaceStore.User]: userProcess.reducer,
});
