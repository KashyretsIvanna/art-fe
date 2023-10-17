import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddGallery.module.scss'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect } from 'react';
import ReusableTextArea from '../../components/inputs/ReusableTextArea/ReusableTextArea';
import ReusableTextInput from '../../components/inputs/ReusableTextInput/ReusableTextInput';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery, useGetGalleryTypesQuery, useGetOrientationsQuery } from '../../store/services/api/classifications/classifications.api';
import json from '../../shared-data/cities.json'
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';

function AddGallery() {


    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations } = useGetOrientationsQuery()
    const { data: galleryTypes } = useGetGalleryTypesQuery()
    const { selectedCity, cities, setGalleryTypes, setClassifications, countries, profileDescription, selectedCountry, selectedOrientations, selectedGalleryTypes, setCities, setCountries, setProfileDescription, setSelectedCity, setSelectedCountry, setGalleryName, setSelectedGalleryTypes, setOrientations, setSelectedOrientations, classifications, orientations, galleryName, selectedClassifications, setSelectedClassifications, types } = useManageProfile()
    const { setCitiesError, setCountriesError, galleryNameError,
        typesError, orientationsError, profileDescriptionError, setErrorClassification, setGalleryNameError, setGenderError, setOrientationsError, setProfileDescriptionError, setTypesError, genderError, classificationsError, citiesError, countriesError, } = useManageFormErrors()


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
                        <ReusableTextInput error={galleryNameError} label={'Gallery Name'} data={galleryName} setData={setGalleryName} placeholder={'Gallery name'} />
                    </div>
                    <div className={styles.input_row_container}>
                        <MultiSelect options={types} selectedOption={selectedGalleryTypes} setSelectedOption={setSelectedGalleryTypes} label={'Gallery type'} error={typesError} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}>
                        <InputPopup options={countries} onChange={setSelectedCountry} setSelectedOption={setSelectedCountry} selectedOption={selectedCountry} label={'Select Country'} error={countriesError} />
                    </div>
                    <div className={styles.input_row_container}>
                        <MultiSelect error={orientationsError} options={orientations} selectedOption={selectedOrientations} setSelectedOption={setSelectedOrientations} label={'Art Orientations'} />
                    </div>
                </div>

                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container}>
                        <InputPopup options={cities} onChange={setSelectedCity} selectedOption={selectedCity} setSelectedOption={setSelectedCity} label={'Select City'} error={citiesError} />
                    </div>
                    <div className={styles.input_row_container}>
                        <MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>

            </div>
            <div className={styles.inputs_container__textarea}>
                <ReusableTextArea error={profileDescriptionError} label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} />
            </div>
            <NavigationSteps onContinue={() => { console.log('cont') }} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddGallery;
