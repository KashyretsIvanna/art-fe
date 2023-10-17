/** @format */

import { useState } from 'react';

export default function useManageFormErrors() {
  const [
    classificationsError,
    setErrorClassification,
  ] = useState('');

  const [citiesError, setCitiesError] =
    useState('');
  const [countriesError, setCountriesError] =
    useState('');
  const [
    profileDescriptionError,
    setProfileDescriptionError,
  ] = useState('');
  const [ageError, setAgeError] = useState('');
  const [
    orientationsError,
    setOrientationsError,
  ] = useState('');
  const [galleryNameError, setGalleryNameError] =
    useState('');
  const [typesError, setTypesError] =
    useState('');
  const [genderError, setGenderError] =
    useState('');

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
