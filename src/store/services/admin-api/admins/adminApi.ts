/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { UserByIdRes } from '../../../types/user/user-by-id.dto';
import { emptySplitAdminApi } from '../../../emptySplitAdminApi';
import { redirectOnUnAuthorized } from '../../../helpers/redirect-401.helper';

const serviceRoute = ApiRoutes.ADMIN;

export const userApi =
  emptySplitAdminApi.injectEndpoints({
    endpoints: (builder) => ({
      getAdmins: builder.query<
        {
          admins: {
            name: string;
            email: string;
            id: number;
          }[];
          pages: number;
        },
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
        transformErrorResponse:
          redirectOnUnAuthorized,
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
        providesTags: [apiTags.admins],
        transformErrorResponse:
          redirectOnUnAuthorized,
      }),

      deleteAdmin: builder.mutation<
        void,
        { userId: number }
      >({
        query: (body: { userId: number }) => ({
          url: serviceRoute + `/${body.userId}`,
          method: 'DELETE',
        }),
        invalidatesTags: [apiTags.admins],
        transformErrorResponse:
          redirectOnUnAuthorized,
      }),

      registerNewAdmin: builder.mutation({
        query: (body: {
          email: string;
          password: string;
          name: string;
        }) => ({
          url: serviceRoute,
          method: 'POST',
          body,
        }),
        invalidatesTags: [apiTags.admins],
      }),
    }),
  });

export const {
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useGetAdminsQuery,
  useRegisterNewAdminMutation,
} = userApi;
