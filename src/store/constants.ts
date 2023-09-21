/** @format */

export const baseUrl: string = import.meta.env
  .ADMIN_API_URL||'http://[::1]:3005/api';
console.log(baseUrl);

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
