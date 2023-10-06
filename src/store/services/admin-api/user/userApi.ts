/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { WhoamiRes } from '../../../types/whoami.types';
import { UserByIdRes } from '../../../types/user/user-by-id.dto';
import { UserListRes } from '../../../types/user/user-list.dto';
import { emptySplitAdminApi } from '../../../emptySplitAdminApi';

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
        keepUnusedDataFor: 0.0001,
        providesTags: [apiTags.user],
      }),
      getUserById: builder.query<
        UserByIdRes,
        { userId: number }
      >({
        query: (body: { userId: number }) => ({
          url:
            EndpointsRoutes.getUsers +
            `/${body.userId}`,
          method: 'GET',
        }),
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
        invalidatesTags: [apiTags.user],
      }),
    }),
  });

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUsersMutation,
} = userApi;
