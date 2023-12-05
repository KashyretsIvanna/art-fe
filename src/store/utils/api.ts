/** @format */

import { BaseQueryApi } from '@reduxjs/toolkit/dist/query';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { RootState } from '../store';

export const getHeaders = (): ((
  headers: Headers,
  api: Pick<BaseQueryApi, 'getState'>,
) =>
  | MaybePromise<void | Headers>
  | undefined) => {
  return (
    headers: Headers,
    api: Pick<BaseQueryApi, 'getState'>,
  ): MaybePromise<void | Headers> | undefined => {
    const token = (api.getState() as RootState)
      .addedUser.added_user_access_token;

    const token2 = (api.getState() as RootState)
      .user.access_token;

    if (
      token &&
      api.endpoint !== 'registerNewUser' &&
      api.endpoint !== 'updateUserById' &&
      api.endpoint !== 'updateUserProfileById' &&
      api.endpoint !== 'getUserById' &&
      api.endpoint !== 'giveSubscription'
    ) {
      headers.set(
        'Authorization',
        `Bearer ${token}`,
      );
    } else {
      headers.set(
        'Authorization',
        `Bearer ${token2}`,
      );
    }

    return headers;
  };
};

export const getAdminHeaders = (): ((
  headers: Headers,
  api: Pick<BaseQueryApi, 'getState'>,
) =>
  | MaybePromise<void | Headers>
  | undefined) => {
  return (
    headers: Headers,
    api: Pick<BaseQueryApi, 'getState'>,
  ): MaybePromise<void | Headers> | undefined => {
    const token = (api.getState() as RootState)
      .user?.access_token;

    if (token) {
      headers.set(
        'Authorization',
        `Bearer ${token}`,
      );
    }

    return headers;
  };
};
