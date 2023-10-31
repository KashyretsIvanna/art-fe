/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import {
  baseAdminUrl,
  baseApiUrl,
} from '../../../constants/api.constants';

import { emptySplitApi } from '../../../emptySplitApi';

interface UserProfileInfo {
  user: {
    email: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    name: string;
    phoneNumber: string | null;
    steps: {
      isLookingForCompleted: boolean;
      isPhotosLoaded: boolean;
      isProfileCompleted: boolean;
      isNumberEntered: boolean;
      isNameEntered: boolean;
    };
  };
  profileLimits: {
    likeLimit: number;
    likeLimitMax: number;
    rewindLimitMax: number;
    favoriteLimitMax: number;
    picksLimitMax: number;
    rewindLimit: number;
    favoriteLimit: number;
    picksLimit: number;
    renewLikesDays: number;
    renewRewindsDays: number;
    renewFavoritesDays: number;
    renewPicksDays: number;
  };
  profilePhotos: number[];
  id: number;
  age: string | null;
  gender: string | null;
  birthdate: string | null;
  aboutMe: string | null;
  country: string;
  city: string;
  role: string;
  galleryName: string;
  profileDescription: string;
  isLookingForArtist: boolean;
  isLookingForCollector: boolean;
  isLookingForGallery: boolean;
  isTutorialShown: boolean;
  profileSettings: {
    emailNotificationsRecieveType: string;
    pushOnNewMessage: boolean;
    pushOnLikes: boolean;
    pushOnAddedToFavorites: boolean;
    pushOnNewMatch: boolean;
    pushOnAppNews: boolean;
    distancePreference: number;
  };
  avatar: number | null;
  classifications: {
    profileArtOrientations: ProfileArtOrientations[];
    profileClassifications: Classifications[];
    profileGalleryTypes: GalleryTypes[];
  };
  progress: 90;
  isPremium: false;
}

interface ProfileArtOrientations {
  id: number;
  orientationName: string;
}

interface Classifications {
  id: number;
  classificationName: string;
}

interface GalleryTypes {
  id: number;
  typeName: string;
}

export const profileApi =
  emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
      createProfile: builder.mutation({
        query: (body: {
          role: string;
          gender?: string;
          galleryName?: string;
          age?: number;
          profileDescription?: string;
          classifications?: number[];
          orientations?: number[];
          galleryTypes?: number[];
          lat: number;
          lng: number;
        }) => ({
          url:
            baseApiUrl +
            '/api' +
            ApiRoutes.PROFILE,
          method: 'POST',
          body,
        }),
        invalidatesTags: [apiTags.profile],
      }),
      setLookingFor: builder.mutation({
        query: (body: {
          preferences: {
            isLookingForGallery?: boolean;
            isLookingForArtist?: boolean;
            isLookingForCollector?: boolean;
          };
          filters: {
            galleryClassifications?: number[];
            galleryTypes?: number[];
            orientations?: number[];
            artistClassifications?: number[];
          };
        }) => ({
          url:
            baseApiUrl +
            '/api' +
            ApiRoutes.PROFILE +
            '/looking-for',
          method: 'PUT',
          body,
        }),
        invalidatesTags: [apiTags.profile],
      }),
      registerNewUser: builder.mutation({
        query: (body: {
          email: string;
          password: string;
          name: string;
        }) => {
          const token = JSON.parse(
            localStorage.getItem('persist:user'),
          ).access_token.slice(1, -1);

          return {
            url:
              baseAdminUrl +
              '/api' +
              ApiRoutes.USER,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body,
          };
        },
        invalidatesTags: [apiTags.profile],
      }),
      addPhotos: builder.mutation({
        query: (body: {
          file: Blob;
          order: number;
        }) => {
          const formData = new FormData();
          formData.append(
            'photo',
            body.file as Blob,
          );
          return {
            url:
              baseApiUrl +
              '/api' +
              ApiRoutes.PROFILE +
              '/photo',
            method: 'POST',
            body: formData,

            formData: true,
          };
        },

        invalidatesTags: [apiTags.profile],
      }),

      getNewUserInfo: builder.query<
        {
          email: string;
          name: string;
          phoneNumber: string;
          isPhoneVerified: boolean;
          isEmailVerified: boolean;
          steps: {
            isLookingForCompleted: boolean;
            isPhotosLoaded: boolean;
            isProfileCompleted: boolean;
          };
        },
        void
      >({
        query: () => ({
          url:
            baseApiUrl +
            '/api' +
            ApiRoutes.USER +
            '/me',
          method: 'GET',
        }),
        providesTags: [apiTags.profile],
        keepUnusedDataFor: 0.0001,
      }),

      getNewProfileInfo: builder.query<
        UserProfileInfo,
        void
      >({
        query: () => ({
          url:
            baseApiUrl +
            '/api' +
            ApiRoutes.PROFILE,
          method: 'GET',
        }),
        providesTags: [apiTags.profile],
        keepUnusedDataFor: 0.0001,
      }),
    }),
  });

export const {
  useCreateProfileMutation,
  useGetNewUserInfoQuery,
  useAddPhotosMutation,
  useRegisterNewUserMutation,
  useSetLookingForMutation,
  useGetNewProfileInfoQuery,
} = profileApi;
