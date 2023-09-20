/** @format */

import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ApiRoutes, baseUrl } from '../../constants';
import { RootState } from '../../store';

export const userAuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:baseUrl + ApiRoutes.AUTH,
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
  }),
});

export const { useLoginUserMutation } =
  userAuthApi;
