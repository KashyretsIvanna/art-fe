/** @format */

import queryString from 'query-string';

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { ApiError } from './types/error.types';
import { getHeaders } from './utils/api';
import { apiTags } from './constants';
export const emptySplitApi = createApi({
  reducerPath: 'emptySplitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: getHeaders(),
    paramsSerializer: (params) => {
      return queryString.stringify(params, {
        arrayFormat: 'bracket',
      });
    },
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ApiError
  >,
  endpoints: () => ({}),
  tagTypes: Object.values(apiTags),
});
