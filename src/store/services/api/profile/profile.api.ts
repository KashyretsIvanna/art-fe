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
    }),
  });

export const {
  useCreateProfileMutation,
  useGetNewUserInfoQuery,
  useAddPhotosMutation,
  useRegisterNewUserMutation,
} = profileApi;
