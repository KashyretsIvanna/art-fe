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
import { getAdminHeaders } from '../utils/api';
import axios from 'axios';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseAdminApiUrl + '/api',
  prepareHeaders: getAdminHeaders(),
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
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
        const token = (
          api.getState() as RootState
        ).user?.refresh_token;

        const refreshResult = await axios.post(
          baseApiUrl + '/api/auth/refresh',
          { refreshToken: token },
          { headers: getAdminHeaders() },
        );

        if (refreshResult.data) {
          api.dispatch(
            setUser({
              access_token:
                refreshResult.data.accessToken,
              refresh_token:
                refreshResult.data.refreshToken,
            }),
          );

          // Retry the initial query
          result = await baseQuery(
            args,
            api,
            extraOptions,
          );
        }
      } catch (err) {
        if (err.message.includes('403')) {
          api.dispatch(logout());
          window.location.href = '/login';
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

export default customFetchBase;
