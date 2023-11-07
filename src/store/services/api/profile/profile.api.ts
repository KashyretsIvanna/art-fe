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
import { UserByIdRes } from '../../../types/user/user-by-id.dto';

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
  progress: number;
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
      updateUserProfileById: builder.mutation({
        query: (body: {
          gender?: string;
          galleryName?: string;
          age?: number;
          profileDescription?: string;
          name?: string;
          userId: number;
        }) => {
          const token = JSON.parse(
            localStorage.getItem('persist:user'),
          ).access_token.slice(1, -1);

          const { userId, ...rest } = body;

          return {
            url:
              baseAdminUrl +
              '/api' +
              ApiRoutes.USER +
              `/${userId}` +
              ApiRoutes.PROFILE,
            method: 'PATCH',
            body: rest,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
        invalidatesTags: [
          apiTags.user,
          apiTags.profile,
        ],
      }),
      updateUserById: builder.mutation({
        query: (body: {
          email?: string;
          phoneNumber?: string;
          userId: number;
          discovery?: {
            location?: {
              lat: number;
              lng: number;
            };
          };
        }) => {
          const token = JSON.parse(
            localStorage.getItem('persist:user'),
          ).access_token.slice(1, -1);

          const { userId, ...rest } = body;
          return {
            url:
              baseAdminUrl +
              '/api' +
              ApiRoutes.USER +
              `/${userId}`,
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: rest,
          };
        },
        async onQueryStarted(
          { id, ...patch },
          { dispatch, queryFulfilled },
        ) {
          const patchResult = dispatch(
            profileApi.util.updateQueryData(
              'getNewProfileInfo',
              id,
              (draft) => {
                Object.assign(draft, patch);
              },
            ),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: [
          apiTags.profile,
          apiTags.user,
        ],
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
          formData.append(
            'order',
            body.order.toString(),
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

      getUserById: builder.query<
        UserByIdRes,
        { userId: number }
      >({
        query: (body: { userId: number }) => {
          const token = JSON.parse(
            localStorage.getItem('persist:user'),
          ).access_token.slice(1, -1);

          return {
            url:
              baseAdminUrl +
              '/api' +
              '/user' +
              `/${body.userId}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
        keepUnusedDataFor: 0.0001,
        providesTags: [
          apiTags.user,
          apiTags.profile,
        ],
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
  useUpdateUserByIdMutation,
  useUpdateUserProfileByIdMutation,
  useGetUserByIdQuery,
} = profileApi;
