/** @format */

import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiRoutes } from '../../../constants';
import { baseApiUrl } from '../../../constants/api.constants';
import customFetchApiBase from '../../../middlewares/customFetchBaseQueryApi';

export const classificationsApi = createApi({
  reducerPath: 'classificationsApi',
  baseQuery: customFetchApiBase,
  endpoints: (builder) => ({
    getClassifications: builder.query<
      {
        id: number;
        classificationName: string;
      }[],
      { role: string }
    >({
      query: (body: { role: string }) => ({
        url:
          baseApiUrl +
          '/api' +
          ApiRoutes.ART_CLASSIFICATION,
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
        url:
          baseApiUrl +
          '/api' +
          ApiRoutes.ART_ORIENTATION,
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
        url:
          baseApiUrl +
          '/api' +
          ApiRoutes.GALLERY_TYPE,
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
