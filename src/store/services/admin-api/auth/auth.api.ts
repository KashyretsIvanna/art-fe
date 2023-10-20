/** @format */

import { ApiRoutes } from '../../../constants';

import { emptySplitAdminApi } from '../../../emptySplitAdminApi';

export const userAuthApi =
  emptySplitAdminApi.injectEndpoints({
    endpoints: (builder) => ({
      loginUser: builder.mutation({
        query: (body: {
          email: string;
          password: string;
        }) => ({
          url: ApiRoutes.AUTH + '/login',
          method: 'POST',
          body,
        }),
      }),
    }),
  });

export const { useLoginUserMutation } =
  userAuthApi;
