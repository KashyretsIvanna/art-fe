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


const genders = [
    { value: GenderType.FEMALE, label: 'Female' },
    { value: GenderType.MALE, label: 'Male' },
    { value: GenderType.NOT_SPECIFIED, label: 'Not specified' },
    { value: GenderType.OTHER, label: 'Other' },
];

function AddCollector() {


    const navigate = useNavigate()

    const { selectedCity, cities, countries, profileDescription, age, selectedCountry, selectedGender, setAge, setCities, setCountries, setProfileDescription, setSelectedCity, setSelectedCountry, setSelectedGender } = useManageProfile()
    const { ageError, profileDescriptionError, genderError, citiesError, countriesError, } = useManageFormErrors()

    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))
    }


    useEffect(() => { parseJson() }, [])
    useEffect(() => {
        if (selectedCountry.value !== '0') {
            setCities(json[selectedCountry.value].map(el => ({ label: el.name, value: el.name })))
        }
        setSelectedCity({ value: '0', label: 'Select city' })
    }, [selectedCountry])


    return (
        <AdminLayout headerRight={
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
            <NavigationSteps onContinue={() => { navigate('lookFor') }} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddCollector;
