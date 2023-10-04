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
import { baseAdminUrl } from './constants/api.constants';
console.log(baseAdminUrl);
export const emptySplitAdminApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseAdminUrl + '/api',
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
