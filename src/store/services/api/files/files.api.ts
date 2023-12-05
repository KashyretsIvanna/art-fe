/** @format */

import { ApiRoutes } from '../../../constants';
import { baseApiUrl } from '../../../constants/api.constants';
import { emptySplitApi } from '../../../emptySplitApi';

export const filesApi =
  emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
      getProfilePhotoById: builder.query<
        any,
        { profilePhotoId: number }
      >({
        query: (body: {
          profilePhotoId: number;
        }) => ({
          url:
            baseApiUrl +
            '/api' +
            ApiRoutes.FILES +
            '/profile-photo' +
            `/${body.profilePhotoId}`,
          responseHandler: async (response) => {
            return response.blob();
          },
          method: 'GET',
        }),
        keepUnusedDataFor: 0.0001,
      }),
    }),
  });

export const { useGetProfilePhotoByIdQuery } =
  filesApi;
