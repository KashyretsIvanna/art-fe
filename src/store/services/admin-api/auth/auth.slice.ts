/** @format */

import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import { RootState } from '../../../store';

export interface AuthState {
  access_token: string;
}

const initialState: AuthState = {
  access_token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        access_token: string;
      }>,
    ) {
      state.access_token =
        action.payload?.access_token;
    },
    logout: (state) => {
      state.access_token = '';
    },
  },
});

const authPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['access_token'],
};

export const persistedAuthReducer =
  persistReducer(
    authPersistConfig,
    authSlice.reducer,
  );

export const { setUser, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuthToken = (
  state: RootState,
) => state.user?.access_token;
