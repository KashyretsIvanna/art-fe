/** @format */

import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../store';

export interface AddUserState {
  role: string | null;
  city: string | null;
  country: string | null;
  artClassifications: number[];
  artOrientations: number[];
  galleryType: number[];
  galleryName: string | null;
  profileDescription: string | null;
  age: number | null;
  gender: string | null;
}

export interface ArtistInfo {
  city: string | null;
  country: string | null;
  artClassifications: number[];
  profileDescription: string | null;
  age: number | null;
  gender: string | null;
}

export interface CollectorInfo {
  city: string | null;
  country: string | null;
  artClassifications: number[];
  profileDescription: string | null;
  age: number | null;
  gender: string | null;
}

export interface GalleryInfo {
  city: string | null;
  country: string | null;
  artClassifications: number[];
  artOrientations: number[];
  galleryType: number[];
  galleryName: string | null;
  profileDescription: string | null;
}

const initialState: AddUserState = {
  city: null,
  role: null,
  country: null,
  artClassifications: [],
  artOrientations: [],
  galleryType: [],
  galleryName: null,
  profileDescription: null,
  age: null,
  gender: null,
};

const userSlice = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    addUser(
      state,
      action: PayloadAction<AddUserState>,
    ) {
      state = action.payload;
    },
    setRole(
      state,
      action: PayloadAction<{ role: string }>,
    ) {
      state.role = action.payload.role;
    },
    setGalleryInfo(
      state,
      action: PayloadAction<GalleryInfo>,
    ) {
      state.role = action.payload.city;
      state.role = action.payload.country;
      state.artClassifications =
        action.payload.artClassifications;
      state.artOrientations =
        action.payload.artOrientations;
      state.galleryType =
        action.payload.galleryType;
      state.role = action.payload.galleryName;
      state.role =
        action.payload.profileDescription;
    },
    setArtistInfo(
      state,
      action: PayloadAction<ArtistInfo>,
    ) {
      state.role = action.payload.city;
      state.role = action.payload.country;
      state.artClassifications =
        action.payload.artClassifications;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.role =
        action.payload.profileDescription;
    },
    setCollectorInfo(
      state,
      action: PayloadAction<CollectorInfo>,
    ) {
      state.role = action.payload.city;
      state.role = action.payload.country;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.role =
        action.payload.profileDescription;
    },
  },
});

export const {
  addUser,
  setArtistInfo,
  setCollectorInfo,
  setGalleryInfo,
  setRole,
} = userSlice.actions;

export const addUserReducer = userSlice.reducer;

export const selectAddedUserData = (
  state: RootState,
) => state.addedUser;
