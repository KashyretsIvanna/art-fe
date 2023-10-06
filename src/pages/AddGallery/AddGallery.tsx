import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddGallery.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import ReusableTextInput from '../../components/inputs/ReusableTextInput/ReusableTextInput';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery, useGetGalleryTypesQuery, useGetOrientationsQuery } from '../../store/services/api/classifications/classifications.api';
import json from '../../shared-data/cities.json'

function AddGallery() {
    const [profileDescription, setProfileDescription] = useState<string | undefined>()
    const [galleryName, setGalleryName] = useState<string | undefined>('')

    const [orientations, setOrientations] = useState<{
        value: string;
        label: string;
    }[]>([])
    const [classifications, setClassifications] = useState<{
        value: string;
        label: string;
    }[]>([])
    const [types, setGalleryTypes] = useState<{
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


    const [selectedOrientations, setSelectedOrientations] = useState<{
        value: string;
        label: string;
    }[]>([]);
    const [selectedGalleryTypes, setSelectedGalleryTypes] = useState<{
        value: string;
        label: string;
    }[]>([]);
    const [selectedClassifications, setSelectedClassifications] = useState<{
        value: string;
        label: string;
    }[]>([]);
    const [selectedCity, setSelectedCity] = useState<{
        value: string;
        label: string;
    }>({ value: '0', label: 'Select city' });

    const [selectedCountry, setSelectedCountry] = useState<{
        value: string;
        label: string;
    }>({ value: '0', label: 'Select country' });

    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations } = useGetOrientationsQuery()
    const { data: galleryTypes } = useGetGalleryTypesQuery()

    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))

    }


    useEffect(() => { parseJson() }, [])
    useEffect(() => {
        if (selectedCountry.value !== '0') {
            console.log(selectedCountry.value)
            setCities(json[selectedCountry.value].map(el => ({ label: el.name, value: el.name })))
        }

        setSelectedCity({ value: '0', label: 'Select city' })
    }, [selectedCountry])
    useEffect(() => {
        if (galleryClassifications) {
            setClassifications(galleryClassifications.map((el: { id: number; classificationName: string; }) => ({
                value: el.id.toString(),
                label: el.classificationName
            })))
        }
    }, [galleryClassifications, setClassifications])
    useEffect(() => {
        if (galleryTypes) {
            setGalleryTypes(galleryTypes.map((el: { id: number; typeName: string; }) => ({
                value: el.id.toString(),
                label: el.typeName
            })))
        }
    }, [galleryTypes])
    useEffect(() => {
        if (artOrientations) {
            setOrientations(artOrientations.map((el: { id: number; orientationName: string; }) => ({
                value: el.id.toString(),
                label: el.orientationName
            })))
        }
    }, [artOrientations])

    return (
        <AdminLayout headerRight={
            null} navigationItems={['Gallery']} pageHeader='About me( Gallery )'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}>
                        <ReusableTextInput label={'Gallery Name'} data={galleryName} setData={setGalleryName} placeholder={'Gallery name'} />
                    </div>
                    <div className={styles.input_row_container}>
                        <MultiSelect options={types} selectedOption={selectedGalleryTypes} setSelectedOption={setSelectedGalleryTypes} label={'Gallery type'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}>
                        <InputPopup options={countries} onChange={setSelectedCountry} setSelectedOption={setSelectedCountry} selectedOption={selectedCountry} label={'Select Country'} />
                    </div>
                    <div className={styles.input_row_container}>
                        <MultiSelect options={orientations} selectedOption={selectedOrientations} setSelectedOption={setSelectedOrientations} label={'Art Orientations'} />
                    </div>
                </div>

                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}>
                        <InputPopup options={cities} onChange={setSelectedCity} selectedOption={selectedCity} setSelectedOption={setSelectedCity} label={'Select City'} />
                    </div>
                    <div className={styles.input_row_container}>
                        <MultiSelect options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>

            </div>
            <div className={styles.inputs_container__textarea}>
                <ReusableTextArea label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} />
            </div>
            <NavigationSteps onContinue={() => { console.log('cont') }} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddGallery;
