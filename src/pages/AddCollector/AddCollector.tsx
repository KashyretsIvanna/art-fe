import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddCollector.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import { GenderType } from '../../contants/profile-info.constants';
import ReusableNumberInput from '../../components/inputs/ReusableNumberInput copy/ReusableTextInput';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useNavigate } from 'react-router-dom';
import json from '../../shared-data/cities.json'
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { useCreateProfileMutation } from '../../store/services/api/profile/profile.api';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { useDispatch } from 'react-redux';
import { setCollectorInfo } from '../../store/services/admin-api/user/user.slice';

const genders = [
    { value: GenderType.FEMALE, label: 'Female' },
    { value: GenderType.MALE, label: 'Male' },
    { value: GenderType.NOT_SPECIFIED, label: 'Not specified' },
    { value: GenderType.OTHER, label: 'Other' },
];

function AddCollector() {
    UseManageStepsNAvigation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { selectedCity, cities, countries, profileDescription, age, selectedCountry, selectedGender, setAge, setCities, setCountries, setProfileDescription, setSelectedCity, setSelectedCountry, setSelectedGender } = useManageProfile()
    const { ageError, setAgeError, setCitiesError, setCountriesError, profileDescriptionError, setGenderError, genderError, citiesError, countriesError, } = useManageFormErrors()
    const [createProfile, { data: cretedProfileData }] = useCreateProfileMutation()

    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))
    }

    useEffect(() => { parseJson() }, [])
    useEffect(() => {
        if (selectedCountry.value !== '0') {
            setCities(json[selectedCountry.value].map(el => ({ label: el.name, value: el.name, lat: el.lat, lng: el.lng })))
        }
        setSelectedCity({ value: '0', label: 'Select city' })
    }, [selectedCountry])


    const clickButton = () => {
        dispatch(setCollectorInfo(
            {
                gender: selectedGender.label.toUpperCase().split(' ').join('_'),
                age: Number(age),
                profileDescription: profileDescription ?? null,
                lat: Number(selectedCity.lat),
                lng: Number(selectedCity.lng),

            }
        ))
        createProfile({
            role: 'COLLECTOR',
            gender: selectedGender.label.toUpperCase().split(' ').join('_'),
            age: Number(age),
            profileDescription,
            lat: Number(selectedCity.lat),
            lng: Number(selectedCity.lng),

        })

    }

    useEffect(() => {
        if (cretedProfileData) {
            navigate('/clients/look-for')
        }
    }, [cretedProfileData])

    useEffect(() => {
        if (!(!age && selectedCity.value === '0' && selectedCountry.value === '0' && selectedGender.value === '0')) {
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
        }
    }, [age, selectedCity.value, selectedCountry.value, selectedGender.value])

    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
            null} navigationItems={['Collector']} pageHeader='About me( Collector )'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}><InputPopup error={countriesError} selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} options={countries} onChange={setSelectedCountry} label={'Select country'} /></div>
                    <div className={styles.input_row_container}>
                        <InputPopup error={citiesError} options={cities} onChange={setSelectedCity} selectedOption={selectedCity} setSelectedOption={setSelectedCity} label={'Select city'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_col_container__age}> <div className={styles.input_row_container}><ReusableNumberInput error={ageError} max={100} min={18} data={age} setData={setAge} label={'Age'} placeholder={'Age'} /></div></div>
                    <div className={styles.input_row_container}><InputPopup error={genderError} selectedOption={selectedGender} setSelectedOption={setSelectedGender} options={genders} onChange={setSelectedGender} label={'Gender'} /></div>
                </div>
                <div className={styles.input_col_container}><ReusableTextArea error={profileDescriptionError} label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} /></div>
            </div>
            <NavigationSteps disabled={!(!ageError && !citiesError && !countriesError && !genderError && genderError !== null && countriesError !== null && citiesError !== null && ageError !== null)} onContinue={clickButton} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddCollector;
