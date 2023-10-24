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
import { userAuthApi } from './services/admin-api/auth/auth.api';
import { persistedAuthReducer } from './services/admin-api/auth/auth.slice';
import { filesApi } from './services/api/files/files.api';
import { classificationsApi } from './services/api/classifications/classifications.api';
import { persistedAddUserReducer } from './services/admin-api/user/user.slice';
import { emptySplitApi } from './emptySplitApi';
import { locationReducer } from './services/application/location/location.slice';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]:
      userAuthApi.reducer,
    [classificationsApi.reducerPath]:
      classificationsApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    user: persistedAuthReducer,
    location: locationReducer,
    addedUser: persistedAddUserReducer,
    [emptySplitAdminApi.reducerPath]:
      emptySplitAdminApi.reducer,
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
      filesApi.middleware,
      emptySplitAdminApi.middleware,
      emptySplitApi.middleware,
      classificationsApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
