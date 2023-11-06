/** @format */

import { useEffect, useState } from 'react';
import json from '../shared-data/cities.json';
import { GenderType } from '../contants/profile-info.constants';
const genders = [
  { value: GenderType.FEMALE, label: 'Female' },
  { value: GenderType.MALE, label: 'Male' },
  {
    value: GenderType.NOT_SPECIFIED,
    label: 'Not specified',
  },
  { value: GenderType.OTHER, label: 'Other' },
];

export default function useManageProfile() {
  const [age, setAge] = useState<
    number | undefined
  >();
  const [email, setEmail] = useState<
    string | undefined
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

  const parseJson = async () => {
    const regionNames = new Intl.DisplayNames(
      ['en'],
      { type: 'region' },
    );
    setCountries(
      Object.keys(json).map((el) => ({
        label: regionNames.of(el),
        value: el,
      })),
    );
  };

  useEffect(() => {
    parseJson();
  }, []);
  useEffect(() => {
    if (selectedCountry.value !== '0') {
      setCities(
        json[selectedCountry.value].map((el) => ({
          label: el.name,
          value: el.name,
          lat: el.lat,
          lng: el.lng,
        })),
      );
    }
  }, [selectedCountry]);

  return {
    selectedCity,
    selectedClassifications,
    selectedCountry,
    selectedGender,
    selectedGalleryTypes,
    selectedOrientations,
    setAge,
    setCities,
    setEmail,
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
    email,
    orientations,
    galleryName,
    genders,
    types,
  };
}
