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
  lat: number | null;
  lng: number | null;
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
  createdUserId: number | null;
  isCreatedUserViewed: boolean;
  added_user_access_token: null | string;
  added_user_refresh_token: null | string;
}

export interface ArtistInfo {
  lat: number | null;
  lng: number | null;
  artClassifications: number[];
  profileDescription: string | null;
  age: number | null;
  gender: string | null;
}

export interface CollectorInfo {
  lat: number | null;
  lng: number | null;
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
  lat: number | null;
  lng: number | null;
  artClassifications: number[];
  artOrientations: number[];
  galleryType: number[];
  galleryName: string | null;
  profileDescription: string | null;
}

const initialState: AddUserState = {
  lat: null,
  role: null,
  lng: null,
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
  createdUserId: null,
  isCreatedUserViewed: true,
  added_user_access_token: null,
  added_user_refresh_token: null,
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
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.artClassifications =
        action.payload.artClassifications;
      state.artOrientations =
        action.payload.artOrientations;
      state.galleryType =
        action.payload.galleryType;
      state.galleryName =
        action.payload.galleryName;
      state.profileDescription =
        action.payload.profileDescription;
    },
    setArtistInfo(
      state,
      action: PayloadAction<ArtistInfo>,
    ) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
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
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.profileDescription =
        action.payload.profileDescription;
    },
    setCreatedUserId(
      state,
      action: PayloadAction<{
        createdUserId: number;
      }>,
    ) {
      state.createdUserId =
        action.payload.createdUserId;
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
    setNewUser(
      state,
      action: PayloadAction<{
        added_user_access_token: string;
        createdUserId?: number;
        added_user_refresh_token: string;
      }>,
    ) {
      state.added_user_access_token =
        action.payload.added_user_access_token;
      state.added_user_refresh_token =
        action.payload.added_user_refresh_token;
      if (action.payload.createdUserId) {
        state.createdUserId =
          action.payload.createdUserId;
      }
    },
    logoutNewUser: (state) => {
      state.added_user_access_token = '';
      state.added_user_refresh_token = '';
      state.role = null;
      state.lat = null;
      state.lng = null;
      state.artClassifications = [];
      state.artOrientations = [];
      state.galleryType = [];
      state.galleryName = null;
      state.profileDescription = null;
      state.createdUserId = null;

      state.age = null;
      state.gender = null;
      state.lookFor = [];
      state.artistClassifications = [];
      state.galleryClassifications = [];
      state.galleryOrientations = [];
      state.galleryTypes = [];
    },

    removeCreatedUserId(state) {
      state.createdUserId = null;
    },
    setIsCreatedUserViewed(
      state,
      action: PayloadAction<{
        isViewed: boolean;
      }>,
    ) {
      state.isCreatedUserViewed =
        action.payload.isViewed;
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
  setCreatedUserId,
  removeCreatedUserId,
  setIsCreatedUserViewed,
  setNewUser,
  logoutNewUser,
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

export const selectNewUserAuthToken = (
  state: RootState,
) => state.addedUser.added_user_access_token;
