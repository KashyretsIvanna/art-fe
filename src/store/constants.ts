/** @format */

export const baseUrl: string =
  import.meta.env.API_URL ||
  'http://[::1]:3005/api';

export enum ApiRoutes {
  USER = '/user',
  AUTH = '/auth',
  ADMIN = '/admin',
}

export const keepUnusedDataFor = 0.01;

export const apiTags = {
  user: 'User',
};

export const routes = {
  login: '/login',
  users: '/users',
};
