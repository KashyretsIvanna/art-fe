/** @format */

import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../../store';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

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
  lookFor: string[];
  artistClassifications: number[];
  galleryClassifications: number[];
  galleryOrientations: number[];
  galleryTypes: number[];
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

export interface LookingFor {
  roles: string[];
}

export interface GalleryLookFor {
  galleryClassifications: number[];
  galleryOrientations: number[];
  galleryTypes: number[];
}

export interface ArtistLookFor {
  artistClassifications: number[];
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
  lookFor: [],
  artistClassifications: [],
  galleryClassifications: [],
  galleryOrientations: [],
  galleryTypes: [],
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
    setLookingFor(
      state,
      action: PayloadAction<LookingFor>,
    ) {
      state.lookFor = action.payload.roles;
    },
    setArtistClassifications(
      state,
      action: PayloadAction<ArtistLookFor>,
    ) {
      state.artistClassifications =
        action.payload.artistClassifications;
    },
    setGalleryClassifications(
      state,
      action: PayloadAction<GalleryLookFor>,
    ) {
      state.galleryClassifications =
        action.payload.galleryClassifications;
      state.galleryOrientations =
        action.payload.galleryOrientations;
      state.galleryTypes =
        action.payload.galleryTypes;
    },
    removeNewUserData(state) {
      state.role = null;
      state.city = null;
      state.country = null;
      state.artClassifications = [];
      state.artOrientations = [];
      state.galleryType = [];
      state.galleryName = null;
      state.profileDescription = null;
      state.age = null;
      state.gender = null;
      state.lookFor = [];
      state.artistClassifications = [];
      state.galleryClassifications = [];
      state.galleryOrientations = [];
      state.galleryTypes = [];
    },
  },
});

export const {
  addUser,
  setArtistInfo,
  setCollectorInfo,
  setGalleryInfo,
  setRole,
  setArtistClassifications,
  setGalleryClassifications,
  setLookingFor,
  removeNewUserData,
} = userSlice.actions;

const addUserPersistConfig = {
  key: 'addUser',
  storage,
};

export const persistedAddUserReducer =
  persistReducer(
    addUserPersistConfig,
    userSlice.reducer,
  );

export const addUserReducer = userSlice.reducer;

export const selectAddedUserData = (
  state: RootState,
) => state.addedUser;

export const selectNewUserRole = (
  state: RootState,
) => state.addedUser.role;
