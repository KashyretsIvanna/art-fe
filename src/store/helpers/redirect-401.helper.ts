/** @format */

export const redirectOnUnAuthorized = (data: {
  status: number;
}) => {
  if (data.status == 401) {
    window.location.replace(
      'http://localhost:5173/login',
    );
  }
};
