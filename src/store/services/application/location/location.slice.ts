/** @format */

import {
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export interface LocationState {
  isSidebarOpened: boolean;
}

const initialState: LocationState = {
  isSidebarOpened: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsSidebarOpened(state) {
      console.log(!state.isSidebarOpened)
      state.isSidebarOpened =
        !state.isSidebarOpened;
    },
  },
});

export const { setIsSidebarOpened } =
  locationSlice.actions;

export const locationReducer =
  locationSlice.reducer;

export const selectLocationsConfig = (
  state: RootState,
) => state.location;
