/** @format */

import queryString from 'query-string';

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { ApiError } from './types/error.types';
import { getAdminHeaders } from './utils/api';
import { apiTags } from './constants';
import { baseAdminUrl } from './constants/api.constants';
export const emptySplitAdminApi = createApi({
  reducerPath: 'emptySplitAdminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseAdminUrl + '/api',
    prepareHeaders: getAdminHeaders(),
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
