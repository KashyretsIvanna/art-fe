/** @format */

export const baseAdminUrl: string = import.meta
  .env.VITE_ADMIN_API_URL;

export const baseApiUrl: string = import.meta.env
  .VITE_API_URL;
console.log(baseAdminUrl);

export enum ApiRoutes {
  AUTH = '/auth',
}

export const keepUnusedDataFor = 0.01;

export const routes = {
  login: '/user',
};
