/** @format */

import { emptySplitApi } from '../emptySpliyApi';
import { ApiRoutes, apiTags } from '../constants';
import { UserListRes } from '../types/user/user-list.dto';
import { WhoamiRes } from '../types/whoami.types';

const serviceRoute = ApiRoutes.ADMIN;

enum EndpointsRoutes {
  getUserInfo = '/whoami',
  getUsers = '/user',
}

export const userApi =
  emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
      getUserInfo: builder.query<
        {data:WhoamiRes},
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
    }),
  });

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useGetUsersQuery,
} = userApi;
