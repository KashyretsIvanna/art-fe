/** @format */

import { createApi } from '@reduxjs/toolkit/query/react';

import { apiTags } from './constants';
import customFetchBase from './middlewares/customFetchBaseQuery';
export const emptySplitAdminApi = createApi({
  reducerPath: 'emptySplitAdminApi',
  baseQuery: customFetchBase,
  endpoints: () => ({}),
  tagTypes: Object.values(apiTags),
});
