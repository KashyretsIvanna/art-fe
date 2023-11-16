/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { WhoamiRes } from '../../../types/whoami.types';
import { UserListRes } from '../../../types/user/user-list.dto';
import { emptySplitAdminApi } from '../../../emptySplitAdminApi';
import { redirectOnUnAuthorized } from '../../../helpers/redirect-401.helper';

const serviceRoute = ApiRoutes.ADMIN;

enum EndpointsRoutes {
  getUserInfo = '/whoami',
  getUsers = '/user',
}

export const userApi =
  emptySplitAdminApi.injectEndpoints({
    endpoints: (builder) => ({
      getUserInfo: builder.query<
        { data: WhoamiRes },
        void
      >({
        query: () => ({
          url:
            serviceRoute +
            EndpointsRoutes.getUserInfo,
          method: 'GET',
        }),
        keepUnusedDataFor: 0.0001,
        transformErrorResponse:
          redirectOnUnAuthorized,
        providesTags: [apiTags.user],
      }),

      getUsers: builder.query<
        UserListRes,
        { take: number; page: number }
      >({
        query: (body: {
          take: number;
          page: number;
        }) => ({
          url:
            EndpointsRoutes.getUsers +
            `?take=${body.take}&page=${body.page}`,
          method: 'GET',
        }),
        transformErrorResponse:
          redirectOnUnAuthorized,
        keepUnusedDataFor: 0.0001,
        providesTags: [apiTags.user],
      }),

      deleteUsers: builder.mutation<
        void,
        { userId: number }
      >({
        query: (body: { userId: number }) => ({
          url:
            EndpointsRoutes.getUsers +
            `/${body.userId}`,
          method: 'DELETE',
        }),
        transformErrorResponse:
          redirectOnUnAuthorized,
        invalidatesTags: [apiTags.user],
      }),
    }),
  });

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useGetUsersQuery,
  useDeleteUsersMutation,
} = userApi;
