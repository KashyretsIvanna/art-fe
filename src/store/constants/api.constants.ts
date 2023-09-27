/** @format */

export const baseUrl: string = import.meta.env.VITE_ADMIN_API_URL
console.log(baseUrl);

export enum ApiRoutes {
  AUTH = '/auth',
}

export const keepUnusedDataFor = 0.01;

export const routes = {
  login: '/user',
};
