/** @format */

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useGetNewUserInfoQuery } from '../store/services/api/profile/profile.api';
import { useNavigate } from 'react-router-dom';
import {
  logoutNewUser,
  selectAddedUserData,
  selectNewUserAuthToken,
  setIsCreatedUserViewed,
} from '../store/services/admin-api/user/user.slice';
import { useEffect } from 'react';

export default function UseManageStepsNAvigation() {
  const { data, isLoading } =
    useGetNewUserInfoQuery();
  const dispatch = useDispatch();
  const addedUser = useSelector(
    selectAddedUserData,
  );
  const newUserAuthToken = useSelector(
    selectNewUserAuthToken,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !addedUser.isCreatedUserViewed &&
      addedUser.createdUserId
    ) {
      dispatch(
        setIsCreatedUserViewed({
          isViewed: true,
        }),
      );

      navigate(
        `/clients/${addedUser.createdUserId}`,
        {
          replace: true,
        },
      );
      return;
    }

    if (
      data &&
      data.steps.isLookingForCompleted &&
      data.steps.isPhotosLoaded &&
      data.steps.isProfileCompleted &&
      newUserAuthToken
    ) {
      dispatch(logoutNewUser());
      return;
    }

    if (
      !data &&
      !isLoading &&
      !location.pathname.includes(
        'clients/registration',
      )
    ) {
      {
        navigate('/clients/registration', {
          replace: true,
        });

        return;
      }
    }

    if (
      data &&
      !data.steps.isPhotosLoaded &&
      !location.pathname.includes(
        'clients/photos/add',
      )
    ) {
      navigate('/clients/photos/add', {
        replace: true,
      });
      return;
    }

    if (
      data &&
      !data.steps.isProfileCompleted &&
      data.steps.isPhotosLoaded
    ) {
      if (
        !addedUser.role &&
        !location.pathname.includes(
          '/clients/add',
        )
      ) {
        navigate('/clients/add', {
          replace: true,
        });
        return;
      } else if (
        addedUser.role &&
        !location.pathname.includes(
          `clients/${addedUser.role.toLowerCase()}`,
        )
      ) {
        navigate(
          `/clients/${addedUser.role.toLowerCase()}`,
          { replace: true },
        );
        return;
      }
    }

    if (
      data &&
      !isLoading &&
      !data.steps.isLookingForCompleted &&
      data.steps.isProfileCompleted
    ) {
      if (
        !addedUser.lookFor.length &&
        !location.pathname.includes(
          `clients/look-for`,
        )
      ) {
        navigate('/clients/look-for', {
          replace: true,
        });
        return;
      } else {
        if (
          addedUser.lookFor.includes('GALLERY') &&
          !addedUser.galleryClassifications
            .length &&
          !location.pathname.includes(
            `clients/gallery/look-for`,
          )
        ) {
          navigate('/clients/gallery/look-for', {
            replace: true,
          });
          return;
        } else if (
          addedUser.lookFor.includes('ARTIST') &&
          !addedUser.artistClassifications
            .length &&
          !location.pathname.includes(
            `clients/artist/look-for`,
          )
        ) {
          navigate('/clients/artist/look-for', {
            replace: true,
          });
          return;
        }
      }
    }
  }, [
    addedUser,
    data,
    dispatch,
    isLoading,
    navigate,
    newUserAuthToken,
  ]);
}
