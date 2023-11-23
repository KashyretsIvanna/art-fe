/** @format */

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useGetNewUserInfoQuery } from '../store/services/api/profile/profile.api';
import { useNavigate } from 'react-router-dom';
import {
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
  const { data } = useGetNewUserInfoQuery();
  const dispatch = useDispatch();
  const addedUser = useSelector(
    selectAddedUserData,
  );

  const { currentStep } = useSelector(
    selectLocationsConfig,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentStep ===
        ProfileCreationSteps.LOGIN &&
      data &&
      addedUser.added_user_access_token?.length &&
      !data.steps.isPhotosLoaded
    ) {
      dispatch(
        setCurrentStep({
          currentStep:
            ProfileCreationSteps.PHOTOS,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (
      currentStep ===
        ProfileCreationSteps.PROFILE &&
      !Boolean(addedUser.isCreatedUserViewed) &&
      Number(addedUser.createdUserId)
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
      !location.pathname.includes(
        'clients/registration',
      ) &&
      currentStep === ProfileCreationSteps.LOGIN
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
          `clients/${ProfileCreationSteps.COLLECTOR.toLowerCase()}`,
        ) &&
        currentStep ===
          ProfileCreationSteps.COLLECTOR
      ) {
        navigate(
          `/clients/${ProfileCreationSteps.COLLECTOR.toLowerCase()}`,
          { replace: false },
        );

        return;
      } else if (
        !location.pathname.includes(
          `clients/${ProfileCreationSteps.GALLERY.toLowerCase()}`,
        ) &&
        currentStep ===
          ProfileCreationSteps.GALLERY
      ) {
        navigate(
          `/clients/${ProfileCreationSteps.GALLERY.toLowerCase()}`,
          { replace: false },
        );

        return;
      } else if (
        !location.pathname.includes(
          `clients/${ProfileCreationSteps.ARTIST.toLowerCase()}`,
        ) &&
        currentStep ===
          ProfileCreationSteps.ARTIST
      ) {
        navigate(
          `/clients/${ProfileCreationSteps.ARTIST.toLowerCase()}`,
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
