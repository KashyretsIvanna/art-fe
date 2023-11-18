/** @format */

import {
  ApiRoutes,
  apiTags,
} from '../../../constants';
import { baseAdminUrl } from '../../../constants/api.constants';
import { emptySplitApi } from '../../../emptySplitApi';
import { redirectOnUnAuthorized } from '../../../helpers/redirect-401.helper';

const serviceRoute = ApiRoutes.SUBSCRIPTIONS;

export const subscriptionApi =
  emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
      giveSubscription: builder.mutation<
        void,
        {
          amountDays: number;
          userId: number;
        }
      >({
        query: (body: {
          userId: number;
          amountDays: number;
        }) => {
          const token = JSON.parse(
            localStorage.getItem('persist:user'),
          )?.access_token.slice(1, -1);

          return {
            url:
              baseAdminUrl +
              '/api' +
              serviceRoute +
              `/grant`,
            method: 'POST',
            body,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
        transformErrorResponse:
          redirectOnUnAuthorized,
        invalidatesTags: [
          apiTags.profile,
          apiTags.user,
        ],
      }),
    }),
  });

export const { useGiveSubscriptionMutation } =
  subscriptionApi;
