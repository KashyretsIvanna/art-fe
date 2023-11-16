/** @format */

import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ApiRoutes } from '../../../constants';
import { RootState } from '../../../store';
import { baseApiUrl } from '../../../constants/api.constants';

export const classificationsApi = createApi({
  reducerPath: 'classificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl + '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.access_token;
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
    getClassifications: builder.query<
      {
        id: number;
        classificationName: string;
      }[],
      { role: string }
    >({
      query: (body: { role: string }) => ({
        url: ApiRoutes.ART_CLASSIFICATION,
        method: 'POST',
        body,
      }),
      keepUnusedDataFor: 0.0001,
    }),
    getOrientations: builder.query<
      {
        id: number;
        orientationName: string;
      }[],
      void
    >({
      query: () => ({
        url: ApiRoutes.ART_ORIENTATION,
        method: 'GET',
      }),
      keepUnusedDataFor: 0.0001,
    }),
    getGalleryTypes: builder.query<
      {
        id: number;
        typeName: string;
      }[],
      void
    >({
      query: () => ({
        url: ApiRoutes.GALLERY_TYPE,
        method: 'GET',
      }),
      keepUnusedDataFor: 0.0001,
    }),
  }),
});

export const {
  useGetClassificationsQuery,
  useGetGalleryTypesQuery,
  useGetOrientationsQuery,
} = classificationsApi;
