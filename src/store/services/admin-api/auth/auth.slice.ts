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
  added_user_access_token: string;
}

const initialState: AuthState = {
  access_token: '',
  added_user_access_token: '',
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
        action.payload.access_token;
    },
    setNewUser(
      state,
      action: PayloadAction<{
        added_user_access_token: string;
      }>,
    ) {
      state.added_user_access_token =
        action.payload.added_user_access_token;
    },
    setRegisteredUser(
      state,
      action: PayloadAction<{
        access_token: string;
      }>,
    ) {
      state.access_token =
        action.payload.access_token;
    },
    logout: (state) => {
      state.access_token = '';
    },
    logoutNewUser: (state) => {
      state.added_user_access_token = '';
    },
  },
});

const authPersistConfig = {
  key: 'user',
  storage,
  whitelist: [
    'access_token',
    'added_user_access_token',
  ],
};

export const persistedAuthReducer =
  persistReducer(
    authPersistConfig,
    authSlice.reducer,
  );

export const {
  setUser,
  logout,
  setNewUser,
  logoutNewUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuthToken = (
  state: RootState,
) => state.user.access_token;

export const selectNewUserAuthToken = (
  state: RootState,
) => state.user.added_user_access_token;
