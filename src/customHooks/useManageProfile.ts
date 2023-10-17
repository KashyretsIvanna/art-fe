/** @format */

import { useState } from 'react';

export default function useManageProfile() {
  const [age, setAge] = useState<
    number | undefined
  >();
  const [
    profileDescription,
    setProfileDescription,
  ] = useState<string | undefined>();
  const [classifications, setClassifications] =
    useState<
      {
        value: string;
        label: string;
      }[]
    >([]);
  const [countries, setCountries] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [cities, setCities] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [selectedCity, setSelectedCity] =
    useState<{
      value: string;
      label: string;
    }>({ value: '0', label: 'Select city' });
  const [selectedGender, setSelectedGender] =
    useState({
      value: '0',
      label: 'Select gender',
    });
  const [
    selectedClassifications,
    setSelectedClassifications,
  ] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [selectedCountry, setSelectedCountry] =
    useState<{
      value: string;
      label: string;
    }>({ value: '0', label: 'Select country' });

  const [galleryName, setGalleryName] = useState<
    string | undefined
  >('');

  const [orientations, setOrientations] =
    useState<
      {
        value: string;
        label: string;
      }[]
    >([]);

  const [types, setGalleryTypes] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [
    selectedOrientations,
    setSelectedOrientations,
  ] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [
    selectedGalleryTypes,
    setSelectedGalleryTypes,
  ] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  return {
    selectedCity,
    selectedClassifications,
    selectedCountry,
    selectedGender,
    selectedGalleryTypes,
    selectedOrientations,
    setAge,
    setCities,
    setClassifications,
    setCountries,
    setProfileDescription,
    setSelectedCountry,
    setSelectedCity,
    setSelectedClassifications,
    setSelectedGender,
    setSelectedOrientations,
    setGalleryName,
    setGalleryTypes,
    setOrientations,
    setSelectedGalleryTypes,
    cities,
    countries,
    profileDescription,
    classifications,
    age,
    orientations,
    galleryName,
    types,
  };
}
