import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddArtist.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import { GenderType } from '../../contants/profile-info.constants';
import ReusableNumberInput from '../../components/inputs/ReusableNumberInput copy/ReusableTextInput';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery } from '../../store/services/api/classifications/classifications.api';
import json from '../../shared-data/cities.json'
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { useCreateProfileMutation } from '../../store/services/api/profile/profile.api';
import { useNavigate } from 'react-router-dom';

const genders = [
    { value: GenderType.FEMALE, label: 'Female' },
    { value: GenderType.MALE, label: 'Male' },
    { value: GenderType.NOT_SPECIFIED, label: 'Not specified' },
    { value: GenderType.OTHER, label: 'Other' },
];

function AddArtist() {

    const { selectedCity, classifications, cities, countries, profileDescription, age, selectedClassifications, selectedCountry, selectedGender, setAge, setCities, setClassifications, setCountries, setProfileDescription, setSelectedCity, setSelectedClassifications, setSelectedCountry, setSelectedGender } = useManageProfile()
    const { ageError, setAgeError, setCitiesError, setCountriesError, profileDescriptionError, setErrorClassification, setGalleryNameError, setGenderError, setOrientationsError, setProfileDescriptionError, setTypesError, genderError, classificationsError, citiesError, countriesError, } = useManageFormErrors()
    const [createProfile, { data: cretedProfileData, error }] = useCreateProfileMutation()
    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))

    }
    const navigate = useNavigate()

    useEffect(() => { parseJson() }, [])
    useEffect(() => {
        if (selectedCountry.value !== '0') {
            setCities(json[selectedCountry.value].map(el => ({ label: el.name, value: el.name })))
        }
        setSelectedCity({ value: '0', label: 'Select city' })
    }, [selectedCountry])

    const { data } = useGetClassificationsQuery({ role: 'ARTIST' })

    useEffect(() => {
        if (data) {
            setClassifications(data.map((el) => ({
                value: el.id.toString(),
                label: el.classificationName
            })))
        }
    }, [data])

    const clickButton = () => {

        setAgeError('')
        setCitiesError('')
        setErrorClassification('')
        setCountriesError('')
        setGenderError('')


        if (!age || age < 18 || age > 100) {
            setAgeError('Wrong age')
        }
        if (selectedCity.value === '0') {
            setCitiesError('Choose city')
        }
        if (selectedClassifications.length === 0) {
            setErrorClassification('Choose classifications')
        }
        if (selectedClassifications.length > 5) {
            setErrorClassification('You can choose up to 5 classifications')
        }


        if (selectedCountry.value === '0') {
            setCountriesError('Choose country')
        }

        if (selectedGender.value === '0') {
            setGenderError('Choose gender')
        }

        if (!ageError && !citiesError && !classificationsError && !countriesError && !genderError) {
            createProfile({
                role: 'ARTIST',
                gender: selectedGender.label.toUpperCase().split(' ').join('_'),
                age: Number(age),
                profileDescription,
                classifications: selectedClassifications.map(el => Number(el.value)),
                lat: 50.450001,
                lng: 30.523333,

            })
        }
    }

    useEffect(() => {
        if (cretedProfileData) {
            navigate('/clients/look-for')
        }
    }, [cretedProfileData])


    return (
        <AdminLayout headerRight={
            null} navigationItems={['Artist']} pageHeader='About me (Artist)'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}><InputPopup error={countriesError} options={countries} selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} onChange={setSelectedCountry} label={'Select country'} /></div>
                    <div className={styles.input_row_container}><InputPopup error={citiesError} options={cities} selectedOption={selectedCity} setSelectedOption={setSelectedCity} onChange={setSelectedCity} label={'Select city'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_col_container__age}>
                        <div className={styles.input_row_container}><ReusableNumberInput error={ageError} max={100} min={18} data={age} setData={setAge} label={'Age'} placeholder={'Age'} /></div>
                        <div className={styles.input_row__gender}><InputPopup error={genderError} selectedOption={selectedGender} setSelectedOption={setSelectedGender} options={genders} onChange={setSelectedGender} label={'Gender'} /></div>

                    </div>
                    <div className={styles.input_row_container}><MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art classifications'} /></div>
                </div>
                <div className={styles.input_col_container}><ReusableTextArea error={profileDescriptionError} label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} /></div>

            </div>
            <NavigationSteps disabled={false} onContinue={() => { clickButton() }} stepNumber={3} totalAmountSteps={4} />



        </AdminLayout>

    )
}

export default AddArtist;
