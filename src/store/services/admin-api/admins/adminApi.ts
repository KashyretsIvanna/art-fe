/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { UserByIdRes } from '../../../types/user/user-by-id.dto';
import { UserListRes } from '../../../types/user/user-list.dto';
import { emptySplitAdminApi } from '../../../emptySplitAdminApi';

const serviceRoute = ApiRoutes.ADMIN;

export const userApi =
  emptySplitAdminApi.injectEndpoints({
    endpoints: (builder) => ({
      getAdmins: builder.query<
        UserListRes,
        { take: number; page: number }
      >({
        query: (body: {
          take: number;
          page: number;
        }) => ({
          url:
            serviceRoute +
            `?take=${body.take}&page=${body.page}`,
          method: 'GET',
        }),
        keepUnusedDataFor: 0.0001,
        providesTags: [apiTags.admins],
      }),
      getAdminById: builder.query<
        UserByIdRes,
        { userId: number }
      >({
        query: (body: { userId: number }) => ({
          url: serviceRoute + `/${body.userId}`,
          method: 'GET',
        }),
        keepUnusedDataFor: 0.0001,
        providesTags: [apiTags.user],
      }),

      deleteAdmin: builder.mutation<
        void,
        { userId: number }
      >({
        query: (body: { userId: number }) => ({
          url: serviceRoute + `/${body.userId}`,
          method: 'DELETE',
        }),
        invalidatesTags: [apiTags.user],
      }),
    }),
  });

export const {
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useGetAdminsQuery,
} = userApi;
