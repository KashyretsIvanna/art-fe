import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddArtist.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import { GenderType } from '../../contants/profile-info.constants';
import ReusableNumberInput from '../../components/inputs/ReusableNumberInput copy/ReusableTextInput';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery } from '../../store/services/api/classifications/classifications.api';
import json from '../../shared-data/cities.json'

const genders = [
    { value: GenderType.FEMALE, label: 'Female' },
    { value: GenderType.MALE, label: 'Male' },
    { value: GenderType.NOT_SPECIFIED, label: 'Not specified' },
    { value: GenderType.OTHER, label: 'Other' },
];

function AddArtist() {
    const [age, setAge] = useState<number | undefined>()
    const [profileDescription, setProfileDescription] = useState<string | undefined>()
    const [classifications, setClassifications] = useState<{
        value: string;
        label: string;
    }[]>([])
    const [countries, setCountries] = useState<{
        value: string;
        label: string;
    }[]>([])
    const [cities, setCities] = useState<{
        value: string;
        label: string;
    }[]>([])


    const [selectedCity, setSelectedCity] = useState<{
        value: string;
        label: string;
    }>({ value: '0', label: 'Select city' });
    const [selectedGender, setSelectedGender] = useState({ value: '0', label: 'Select gender' });
    const [selectedClassifications, setSelectedClassifications] = useState<{
        value: string;
        label: string;
    }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<{
        value: string;
        label: string;
    }>({ value: '0', label: 'Select country' });



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

    const { data } = useGetClassificationsQuery({ role: 'ARTIST' })

    useEffect(() => {
        if (data) {
            setClassifications(data.map((el) => ({
                value: el.id.toString(),
                label: el.classificationName
            })))
        }
    }, [data])


    return (
        <AdminLayout headerRight={
            null} navigationItems={['Artist']} pageHeader='About me ( Artist )'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}><InputPopup options={countries} selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} onChange={setSelectedCountry} label={'Select country'} /></div>
                    <div className={styles.input_row_container}><InputPopup options={cities} selectedOption={selectedCity} setSelectedOption={setSelectedCity} onChange={setSelectedCity} label={'Select city'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_col_container__age}>
                        <div className={styles.input_row_container}><ReusableNumberInput max={100} min={18} data={age} setData={setAge} label={'Age'} placeholder={'Age'} /></div>
                        <div className={styles.input_row__gender}><InputPopup selectedOption={selectedGender} setSelectedOption={setSelectedGender} options={genders} onChange={setSelectedGender} label={'Gender'} /></div>

                    </div>
                    <div className={styles.input_row_container}><MultiSelect options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art classifications'} /></div>
                </div>
                <div className={styles.input_col_container}><ReusableTextArea label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} /></div>
            </div>
            <NavigationSteps onContinue={() => { console.log('continue') }} stepNumber={3} totalAmountSteps={4} />


        </AdminLayout>

    )
}

export default AddArtist;
