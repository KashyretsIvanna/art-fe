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

import { emptySplitAdminApi } from './emptySplitAdminApi';
import { userAuthApi } from './services/auth/auth.api';
import { persistedAuthReducer } from './services/auth/auth.slice';
import { filesApi } from './services/files/files.api';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]:
      userAuthApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    user: persistedAuthReducer,

    [emptySplitAdminApi.reducerPath]:
      emptySplitAdminApi.reducer,
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
      filesApi.middleware,
      emptySplitAdminApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
