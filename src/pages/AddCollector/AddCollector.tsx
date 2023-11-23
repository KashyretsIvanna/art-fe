import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddCollector.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import { GenderType } from '../../contants/profile-info.constants';
import ReusableNumberInput from '../../components/inputs/ReusableNumberInput copy/ReusableTextInput';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import json from '../../shared-data/cities.json'
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { useCreateProfileMutation } from '../../store/services/api/profile/profile.api';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { useDispatch } from 'react-redux';
import { logoutNewUser, setCollectorInfo, setRole } from '../../store/services/admin-api/user/user.slice';
import { ProfileCreationSteps, setCurrentStep } from '../../store/services/application/location/location.slice';

const genders = [
    { value: GenderType.FEMALE, label: 'Female' },
    { value: GenderType.MALE, label: 'Male' },
    { value: GenderType.NOT_SPECIFIED, label: 'Not specified' },
    { value: GenderType.OTHER, label: 'Other' },
];

function AddCollector() {
    UseManageStepsNAvigation()
    const dispatch = useDispatch()

    const { selectedCity, cities, countries, profileDescription, age, selectedCountry, selectedGender, setAge, setCities, setCountries, setProfileDescription, setSelectedCity, setSelectedCountry, setSelectedGender } = useManageProfile()
    const { ageError, setAgeError, setCitiesError, setCountriesError, profileDescriptionError, setGenderError, genderError, citiesError, countriesError, } = useManageFormErrors()
    const [createProfile, { data: cretedProfileData, error }] = useCreateProfileMutation()

    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))
    }
    useEffect(() => {
        if (error) {
            dispatch(logoutNewUser())
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOGIN }))
        }
    }, [error])

    useEffect(() => { parseJson() }, [])
    useEffect(() => {
        if (selectedCountry.value !== '0') {
            setCities(json[selectedCountry.value].map(el => ({ label: el.name, value: el.name, lat: el.lat, lng: el.lng })))
        }
        setSelectedCity({ value: '0', label: 'Select city' })
    }, [selectedCountry])


    const clickButton = async () => {
        dispatch(setCollectorInfo(
            {
                gender: selectedGender.label.toUpperCase().split(' ').join('_'),
                age: Number(age),
                profileDescription: profileDescription ?? null,
                lat: Number(selectedCity.lat),
                lng: Number(selectedCity.lng),

            }
        ))
        await createProfile({
            role: 'COLLECTOR',
            gender: selectedGender.label.toUpperCase().split(' ').join('_'),
            age: Number(age),
            profileDescription,
            lat: Number(selectedCity.lat),
            lng: Number(selectedCity.lng),
            isLocationAuto: false
        })

    }

    useEffect(() => {
        if (cretedProfileData) {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR }))
        }
    }, [cretedProfileData])


    const checkFields = () => {
        if (!age || age < 18 || age > 100 || selectedCity.value === '0' || selectedCountry.value === '0' || selectedGender.value === '0') {
            if (!age || age < 18 || age > 100) {
                setAgeError('Wrong age')
            } else {
                setAgeError('')
            }
            if (selectedCity.value === '0') {
                setCitiesError('Choose city')
            } else {
                setCitiesError('')
            }

            if (selectedCountry.value === '0') {
                setCountriesError('Choose country')
            } else {
                setCountriesError('')
            }

            if (selectedGender.value === '0') {
                setGenderError('Choose gender')
            } else {
                setGenderError('')
            }
        } else {
            clickButton()
        }

    }

    useEffect(() => {

        if (genderError !== null) {
            if (selectedGender.value === '0') {
                setGenderError('Choose gender')
            } else {
                setGenderError('')
            }
        }
    }, [selectedGender.value, setGenderError])


    useEffect(() => {

        if (countriesError !== null) {
            if (selectedCountry.value === '0') {
                setCountriesError('Choose country')
            } else {
                setCountriesError('')
            }
        }
    }, [cities, setCountriesError])



    useEffect(() => {

        if (ageError !== null) {
            if (!age || age < 18 || age > 100) {
                setAgeError('Wrong age')
            } else {
                setAgeError('')
            }
        }
    }, [age, setAgeError])

    useEffect(() => {

        if (citiesError !== null) {
            if (selectedCity.value === '0') {
                setCitiesError('Choose city')
            } else {
                setCitiesError('')
            }
        }
    }, [selectedCity.value, setCitiesError])


    const [activeDropdownNumber, setActiveDropdownNumber] = useState<number>()


    return (
        <AdminLayout onBackButtonClick={() => {
            dispatch(setRole({
                role: null,
            }))
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.CHOOSE_ROLE }))
        }} isBackButtonVisible={true} headerRight={
            null} navigationItems={['Collector']} pageHeader='About me( Collector )'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(1) }}><InputPopup isDropdownOpen={activeDropdownNumber === 1 ? true : false} error={countriesError} selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} options={countries} onChange={setSelectedCountry} label={'Select country'} /></div>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(2) }}>
                        <InputPopup isDropdownOpen={activeDropdownNumber === 2 ? true : false} error={citiesError} options={cities} onChange={setSelectedCity} selectedOption={selectedCity} setSelectedOption={setSelectedCity} label={'Select city'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div onClick={() => { setActiveDropdownNumber(3) }} className={styles.input_col_container__age}> <div className={styles.input_row_container}><ReusableNumberInput error={ageError} max={100} min={18} data={age} setData={setAge} label={'Age'} placeholder={'Age'} /></div></div>
                    <div onClick={() => { setActiveDropdownNumber(4) }} className={styles.input_row_container}><InputPopup isDropdownOpen={activeDropdownNumber === 4 ? true : false} error={genderError} selectedOption={selectedGender} setSelectedOption={setSelectedGender} options={genders} onChange={setSelectedGender} label={'Gender'} /></div>
                </div>
                <div className={styles.input_col_container} onClick={() => { setActiveDropdownNumber(5) }}><ReusableTextArea error={profileDescriptionError} label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} /></div>
            </div>
            <NavigationSteps disabled={false} onContinue={checkFields} stepNumber={4} totalAmountSteps={6} />
        </AdminLayout>




    )
}

export default AddCollector;
