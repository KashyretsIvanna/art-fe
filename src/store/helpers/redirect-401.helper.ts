/** @format */

import { baseAdminUrl } from '../constants/api.constants';

export const redirectOnUnAuthorized = (data: {
  status: number;
}) => {
  if (data.status == 401) {
    // window.location.replace(
    //   `${baseAdminUrl}/login`,
    // );
  }
};

export const redirectOnUnAuthorizedNewProfile =
  (data: { status: number }) => {
    localStorage.removeItem('persist:addUser');

    if (data.status == 401) {
      localStorage.removeItem('persist:location');
    }
  };
