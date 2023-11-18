/** @format */

export enum ApiRoutes {
  USER = '/user',
  FILES = '/files',
  AUTH = '/auth',
  ADMIN = '/admin',
  PAYMENTS = '/payments',
  SUBSCRIPTIONS = '/subscriptions',
  ART_CLASSIFICATION = '/art-classification',
  ART_ORIENTATION = '/art-orientation',
  GALLERY_TYPE = '/gallery-type',
  PROFILE = '/profile',
}

export const keepUnusedDataFor = 0.01;

export const apiTags = {
  user: 'User',
  admins: 'Admins',
  payouts: 'Payouts',
  profile: 'Profile',
  files: 'Files',
};

export const routes = {
  login: '/',
  users: '/users',
  listOfUsers: '/clients',
  registerNewUser: '/registration',
  addPhotos: '/photos/add',
  createProfile: '/clients/add',
  createArtist: '/clients/artist',
  createGallery: '/clients/gallery',
  createCollector: '/clients/collector',
  setLookingFor: '/clients/look-for',
};
