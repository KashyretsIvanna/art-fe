import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from '../store/constants';
import { selectNewUserAuthToken } from '../store/services/admin-api/auth/auth.slice';
import { useGetNewUserInfoQuery } from '../store/services/api/profile/profile.api';

export default function NewUserPrivateRoute() {

  const { data, error, isLoading } = useGetNewUserInfoQuery();
  const token = useSelector(selectNewUserAuthToken);
  const location = useLocation()




  if (!isLoading && location.pathname.includes('admin')) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (!isLoading && location.pathname.includes('registration') && (!token || !data?.email || error)) {
    console.log('d')
    console.log(data)
    console.log(isLoading)
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (location.pathname.includes('/clients' + routes.addPhotos) && !isLoading && (!data?.steps.isPhotosLoaded)) {
    console.log('err4')

    return (
      <>
        <Outlet />
      </>
    );
  }

  if (location.pathname.includes(routes.addPhotos)) {
    console.log('err1')

    return (
      <>
        <Outlet />
      </>
    );
  }


  if (!isLoading && (!data?.steps.isPhotosLoaded)) {
    console.log('err3')

    return <Navigate to={routes.listOfUsers + routes.addPhotos} replace={true} />;

  }






  if (!location.pathname.includes(routes.createProfile) && !location.pathname.includes(routes.createArtist) && !location.pathname.includes(routes.createCollector) && !location.pathname.includes(routes.createGallery) && !isLoading && !data?.steps.isProfileCompleted) {
    console.log('err11')

    return <Navigate to={routes.createProfile} replace={true} />;
  }


  if ((location.pathname.includes(routes.createProfile) || location.pathname.includes(routes.createArtist) || location.pathname.includes(routes.createCollector) || location.pathname.includes(routes.createGallery)) && !data?.steps.isProfileCompleted) {
    console.log('err10')

    return (
      <>
        <Outlet />
      </>
    );
  }

  if (location.pathname.includes(routes.setLookingFor) && data?.steps.isProfileCompleted && !data.steps.isLookingForCompleted) {
    console.log('err6')

    return (
      <>
        <Outlet />
      </>
    );
  }

  if (!isLoading && data?.steps.isProfileCompleted && !data?.steps.isLookingForCompleted) {
    return <Navigate to={routes.setLookingFor} replace={true} />;

  }

  if (location.pathname.includes(routes.setLookingFor) && !data?.steps.isProfileCompleted) {
    console.log('err7')

    return <Navigate to={routes.createProfile} replace={true} />;

  }
  return (
    <>
      <Outlet />
    </>
  );
}