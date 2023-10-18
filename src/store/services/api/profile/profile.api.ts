/** @format */
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ApiRoutes } from '../../../constants';
import { RootState } from '../../../store';
import { baseApiUrl } from '../../../constants/api.constants';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      baseApiUrl + '/api' + ApiRoutes.PROFILE,
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
    createProfile: builder.mutation({
      query: (body: {
        role: string;
        gender?: string;
        galleryName?: string;
        age?: number;
        profileDescription?: string;
        classifications: number[];
        orientations?: number[];
        galleryTypes?: number[];
        // lat: 50.450001;
        // lng: 30.523333;
        city: string;
        country: string;
      }) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    addPhoto: builder.mutation<any, any>({
      query: (body: {
        order: number;
        file: Blob;
      }) => {
        const file = new File(
          [body.file],
          'file',
          { type: 'text/plain' },
        );

        const formData = new FormData();
        formData.append('photo', file);

        return {
          url: 'photo',
          method: 'POST',
          headers: {
            'Content-Type':
              'multipart/form-data;',
          },
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useAddPhotoMutation,
  useCreateProfileMutation,
} = profileApi;
