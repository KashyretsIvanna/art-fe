/** @format */

export enum ApiRoutes {
  USER = '/user',
  FILES = '/files',
  AUTH = '/auth',
  ADMIN = '/admin',
  ART_CLASSIFICATION = '/art-classification',
  ART_ORIENTATION = '/art-orientation',
  GALLERY_TYPE = '/gallery-type',
  PROFILE = '/profile',
}

export const keepUnusedDataFor = 0.01;

export const apiTags = {
  user: 'User',
  admins: 'Admins',
  files: 'Files',
};

export const routes = {
  login: '/',
  users: '/users',
  listOfUsers: '/clients',
};
