/** @format */

import { useState } from 'react';

export default function useManageFormErrors() {
  const [
    classificationsError,
    setErrorClassification,
  ] = useState<null | string>(null);

  const [citiesError, setCitiesError] = useState<
    null | string
  >(null);
  const [countriesError, setCountriesError] =
    useState<null | string>(null);
  const [
    profileDescriptionError,
    setProfileDescriptionError,
  ] = useState<null | string>(null);
  const [ageError, setAgeError] = useState<
    null | string
  >(null);
  const [
    orientationsError,
    setOrientationsError,
  ] = useState<null | string>(null);
  const [galleryNameError, setGalleryNameError] =
    useState<null | string>(null);
  const [typesError, setTypesError] = useState<
    null | string
  >(null);
  const [genderError, setGenderError] = useState<
    null | string
  >(null);

  return {
    setTypesError,
    setGenderError,
    setGalleryNameError,
    setOrientationsError,
    setAgeError,
    setProfileDescriptionError,
    setCountriesError,
    setCitiesError,
    setErrorClassification,
    galleryNameError,
    orientationsError,
    ageError,
    profileDescriptionError,
    countriesError,
    genderError,
    typesError,
    citiesError,
    classificationsError,
  };
}
