/** @format */

import { emptySplitApi } from '../emptySpliyApi';
import { ApiRoutes, apiTags } from '../constants';
import { WhoamiRes } from '../types/whoami.types';

const serviceRoute = ApiRoutes.ADMIN;

enum EndpointsRoutes {
  getUserInfo = '/whoami',
  
}

export const userApi =
  emptySplitApi.injectEndpoints({
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
    }),
  });

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
} = userApi;
