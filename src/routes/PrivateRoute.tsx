import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserInfoQuery } from '../store/services/admin-api/user/userApi';
import { UserRole } from '../store/types/whoami.types';
import { selectAuthRefreshToken } from '../store/services/admin-api/auth/auth.slice';

export default function PrivateRoute() {

  const { data, error, isLoading } = useGetUserInfoQuery();
  const token = useSelector(selectAuthRefreshToken);

  if (!isLoading && (!token || !data?.data.email || data.data.role !== UserRole.ADMIN || error)) {
    return <Navigate to={routes.login} replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}