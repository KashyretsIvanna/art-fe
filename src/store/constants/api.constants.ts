/** @format */

declare let process: {
  env: {
    API_URL: string;
  };
};

export const baseUrl: string =
  (process.env.API_URL as string) ||
  'http://[::1]:3005/api';

export enum ApiRoutes {
  AUTH = '/auth',
}

export const keepUnusedDataFor = 0.01;

export const routes = {
  login: '/user',
};
