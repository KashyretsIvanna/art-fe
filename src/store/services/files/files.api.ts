/** @format */

import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ApiRoutes } from '../../constants';
import { RootState } from '../../store';
import { baseApiUrl } from '../../constants/api.constants';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      baseApiUrl + '/api' + ApiRoutes.FILES,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user
        .access_token;
      if (token) {
        headers.set(
          'authorization',
          `Bearer ${token}`,
        );
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: {
        email: string;
        password: string;
      }) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    getProfilePhotoById: builder.query<
      any,
      { profilePhotoId: number }
    >({
      query: (body: {
        profilePhotoId: number;
      }) => ({
        url:
          'profile-photo' +
          `/${body.profilePhotoId}`,
        responseHandler: async (response) => {
          // const blob = await response.blob();
          // const url =
          //   window.URL || window.webkitURL;
          // const blobPDF =
          //   url.createObjectURL(blob);
          // console.log(blobPDF);
          return response.blob();
        },
        method: 'GET',
      }),
      keepUnusedDataFor: 0.0001,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetProfilePhotoByIdQuery,
} = filesApi;
