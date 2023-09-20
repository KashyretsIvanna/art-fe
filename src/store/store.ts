/** @format */

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { emptySplitApi } from './emptySpliyApi';
import { userAuthApi } from './services/auth/auth.api';
import { persistedAuthReducer } from './services/auth/auth.slice';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]:
      userAuthApi.reducer,
    user: persistedAuthReducer,

    [emptySplitApi.reducerPath]:
      emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(
      userAuthApi.middleware,
      emptySplitApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
