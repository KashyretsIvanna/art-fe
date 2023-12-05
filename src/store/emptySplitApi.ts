/** @format */

import { createApi } from '@reduxjs/toolkit/query/react';

import { apiTags } from './constants';
import customFetchApiBase from './middlewares/customFetchBaseQueryApi';
export const emptySplitApi = createApi({
  reducerPath: 'emptySplitApi',
  baseQuery: customFetchApiBase,
  tagTypes: Object.values(apiTags),
  endpoints: () => ({}),
});
