import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddCollector.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useState } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import { GenderType } from '../../contants/profile-info.constants';
import ReusableNumberInput from '../../components/inputs/ReusableNumberInput copy/ReusableTextInput';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';

const cities = [
    { value: 'city1', label: 'City 1' },
    { value: 'city2', label: 'City 2' },
    { value: 'city3', label: 'City 3' },
    { value: 'city4', label: 'City 4' },
    { value: 'city5', label: 'City 5' },
    { value: 'city6', label: 'City 6' },
    { value: 'city7', label: 'City 7' },
    { value: 'city8', label: 'City 8' },
    { value: 'city9', label: 'City 9' },

];

const countries = [
    { value: 'country1', label: 'Country 1' },
    { value: 'country2', label: 'Country 2' },
    { value: 'country3', label: 'Country 3' },
    { value: 'country4', label: 'Country 4' },
    { value: 'country5', label: 'Country 5' },
];


const genders = [
    { value: GenderType.FEMALE, label: 'Female' },
    { value: GenderType.MALE, label: 'Male' },
    { value: GenderType.NOT_SPECIFIED, label: 'Not specified' },
    { value: GenderType.OTHER, label: 'Other' },
];

function AddCollector() {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [selectedGender, setSelectedGender] = useState({ value: 'option1', label: 'Option 1' });
    const [age, setAge] = useState<number | undefined>()
    const [profileDescription, setProfileDescription] = useState<string | undefined>()

    return (
        <AdminLayout headerRight={
            null} navigationItems={['Collector']} pageHeader='About me( Collector )'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}><InputPopup options={cities} onChange={setSelectedCity} label={'Select city'} /></div>
                    <div className={styles.input_row_container}><InputPopup options={countries} onChange={setSelectedCountry} label={'Select country'} /></div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_col_container__age}> <div className={styles.input_row_container}><ReusableNumberInput data={age} setData={setAge} label={'Age'} placeholder={'Age'} /></div></div>
                    <div className={styles.input_row_container}><InputPopup options={genders} onChange={setSelectedGender} label={'Gender'} /></div>
                </div>
                <div className={styles.input_col_container}><ReusableTextArea label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} /></div>
            </div>
            <NavigationSteps stepNumber={1} totalAmountSteps={3} />
        </AdminLayout>




    )
}

export default AddCollector;
