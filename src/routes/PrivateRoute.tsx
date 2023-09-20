import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserInfoQuery } from '../store/services/userApi';
import { UserRole } from '../store/types/whoami.types';
import { routes } from '../store/constants';
import { selectAuthToken } from '../store/services/auth/auth.slice';

export default function PrivateRoute() {

  const { data, error, isLoading } = useGetUserInfoQuery();
  const token = useSelector(selectAuthToken);

  if (!isLoading && (!token || !data?.data.email || data.data.role !== UserRole.ADMIN || error)) {
    return <Navigate to={routes.login} replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}