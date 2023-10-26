/** @format */

import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface LocationState {
  isSidebarOpened: boolean;
}

const initialState: LocationState = {
  isSidebarOpened: true,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsSidebarOpened(
      state,
      action: PayloadAction<{
        isOpened: boolean;
      }>,
    ) {
      state.isSidebarOpened =
        action.payload.isOpened;
    },
  },
});

const locationPersistConfig = {
  key: 'location',
  storage,
  whitelist: ['isSidebarOpened'],
};

export const persistedLocationReducer =
  persistReducer(
    locationPersistConfig,
    locationSlice.reducer,
  );

export const { setIsSidebarOpened } =
  locationSlice.actions;

export const locationReducer =
  locationSlice.reducer;

export const selectLocationsConfig = (
  state: RootState,
) => state.location;
