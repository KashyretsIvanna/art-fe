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
          return response.blob();
        },
        method: 'GET',
      }),
      keepUnusedDataFor: 0.0001,
    }),
  }),
});

export const {
  useGetProfilePhotoByIdQuery,
} = filesApi;
