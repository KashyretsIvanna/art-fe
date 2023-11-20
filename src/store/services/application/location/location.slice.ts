/** @format */

import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export enum ProfileCreationSteps {
  LOGIN = 'LOGIN',
  PHOTOS = 'PHOTOS',
  CHOOSE_ROLE = 'CHOOSE_ROLE',
  ARTIST = 'ARTIST',
  GALLERY = 'GALLERY',
  COLLECTOR = 'COLLECTOR',
  LOOK_FOR = 'LOOK_FOR',
  LOOK_FOR_ARTIST = 'LOOK_FOR_ARTIST',
  LOOK_FOR_GALLERY = 'LOOK_FOR_GALLERY',
  LOOK_FOR_GALLERY_ARTIST = 'LOOK_FOR_GALLERY_ARTIST',
  PROFILE = 'PROFILE',
}

export interface LocationState {
  isSidebarOpened: boolean;
  currentStep: ProfileCreationSteps;
}

const initialState: LocationState = {
  isSidebarOpened: true,
  currentStep: ProfileCreationSteps.LOGIN,
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
    setCurrentStep(
      state,
      action: PayloadAction<{
        currentStep: ProfileCreationSteps;
      }>,
    ) {
      state.currentStep =
        action.payload.currentStep;
    },
  },
});

const locationPersistConfig = {
  key: 'location',
  storage,
  whitelist: ['isSidebarOpened', 'currentStep'],
};

export const persistedLocationReducer =
  persistReducer(
    locationPersistConfig,
    locationSlice.reducer,
  );

export const {
  setIsSidebarOpened,
  setCurrentStep,
} = locationSlice.actions;

export const locationReducer =
  locationSlice.reducer;

export const selectLocationsConfig = (
  state: RootState,
) => state.location;
