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
import {
  ProfileCreationSteps,
  selectLocationsConfig,
  setCurrentStep,
} from '../store/services/application/location/location.slice';

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
  const { currentStep } = useSelector(
    selectLocationsConfig,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentStep ===
        ProfileCreationSteps.PROFILE &&
      addedUser.isCreatedUserViewed
    ) {
      dispatch(
        setCurrentStep({
          currentStep: ProfileCreationSteps.LOGIN,
        }),
      );
    }
    if (
      currentStep ===
        ProfileCreationSteps.PROFILE &&
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
    }

    if (
      data &&
      data.steps.isLookingForCompleted &&
      data.steps.isPhotosLoaded &&
      data.steps.isProfileCompleted &&
      newUserAuthToken
    ) {
      dispatch(logoutNewUser());
      dispatch(
        setCurrentStep({
          currentStep: ProfileCreationSteps.LOGIN,
        }),
      );

      return;
    }

    if (
      !location.pathname.includes(
        'clients/registration',
      ) &&
      (currentStep ===
        ProfileCreationSteps.LOGIN ||
        (!data && !isLoading))
    ) {
      {
        navigate('/clients/registration', {
          replace: true,
        });

        return;
      }
    }

    if (
      currentStep ===
        ProfileCreationSteps.PHOTOS &&
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
      currentStep ===
        ProfileCreationSteps.CHOOSE_ROLE ||
      currentStep ===
        ProfileCreationSteps.ARTIST ||
      currentStep ===
        ProfileCreationSteps.COLLECTOR ||
      currentStep === ProfileCreationSteps.GALLERY
    ) {
      if (
        currentStep ===
        ProfileCreationSteps.CHOOSE_ROLE
      ) {
        navigate('/clients/add', {
          replace: true,
        });
        return;
      } else if (
        !location.pathname.includes(
          `clients/${currentStep.toLowerCase()}`,
        )
      ) {
        navigate(
          `/clients/${currentStep.toLowerCase()}`,
          { replace: false },
        );
        return;
      }
    }

    if (
      currentStep ===
        ProfileCreationSteps.LOOK_FOR ||
      currentStep ===
        ProfileCreationSteps.LOOK_FOR_GALLERY ||
      currentStep ===
        ProfileCreationSteps.LOOK_FOR_ARTIST ||
      currentStep ===
        ProfileCreationSteps.LOOK_FOR_GALLERY_ARTIST
    ) {
      if (
        currentStep ===
          ProfileCreationSteps.LOOK_FOR &&
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
          (currentStep ===
            ProfileCreationSteps.LOOK_FOR_GALLERY ||
            currentStep ===
              ProfileCreationSteps.LOOK_FOR_GALLERY_ARTIST) &&
          !location.pathname.includes(
            `clients/gallery/look-for`,
          )
        ) {
          navigate('/clients/gallery/look-for', {
            replace: false,
          });
          return;
        } else if (
          currentStep ===
            ProfileCreationSteps.LOOK_FOR_ARTIST &&
          !location.pathname.includes(
            `clients/artist/look-for`,
          )
        ) {
          navigate('/clients/artist/look-for', {
            replace: false,
          });
          return;
        }
      }
    }
  }, [currentStep, navigate]);
}
