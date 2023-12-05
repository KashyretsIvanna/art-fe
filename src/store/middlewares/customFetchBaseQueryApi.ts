/** @format */

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import {
  logout,
  setUser,
} from '../services/admin-api/auth/auth.slice';
import {
  baseAdminApiUrl,
  baseApiUrl,
} from '../constants/api.constants';
import {
  getAdminHeaders,
  getHeaders,
} from '../utils/api';
import axios from 'axios';
import { RootState } from '../store';
import {
  logoutNewUser,
  setNewUser,
} from '../services/admin-api/user/user.slice';

// Create a new mutex
const mutex = new Mutex();

const customFetchApiBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  const isRequestToAdminApp = args?.url.includes(
    baseAdminApiUrl,
  );

  const baseQuery = fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: isRequestToAdminApp
      ? getAdminHeaders()
      : getHeaders(),
  });

  let result = await baseQuery(
    args,
    api,
    extraOptions,
  );

  if (
    (result.error?.data as any)?.message ===
    'Unauthorized'
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        if (!args) {
          console.log('no args');
        }

        const token = isRequestToAdminApp
          ? (api.getState() as RootState).user
              .refresh_token
          : (api.getState() as RootState)
              .addedUser.added_user_refresh_token;

        const refreshResult = await axios.post(
          baseApiUrl + '/api/auth/refresh',
          { refreshToken: token },
        );

        if (refreshResult.data) {
          if (isRequestToAdminApp) {
            api.dispatch(
              setUser({
                access_token:
                  refreshResult.data.accessToken,
                refresh_token:
                  refreshResult.data.refreshToken,
              }),
            );
          } else {
            api.dispatch(
              setNewUser({
                added_user_access_token:
                  refreshResult.data.accessToken,
                added_user_refresh_token:
                  refreshResult.data.refreshToken,
              }),
            );
          }

          // Retry the initial query
          result = await baseQuery(
            args,
            api,
            extraOptions,
          );
        }
      } catch (err) {
        if (err.message.includes('403')) {
          if (isRequestToAdminApp) {
            api.dispatch(logout());
            window.location.href = '/login';
          } else {
            api.dispatch(logoutNewUser());
          }
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(
        args,
        api,
        extraOptions,
      );
    }
  }

  return result;
};

export default customFetchApiBase;
