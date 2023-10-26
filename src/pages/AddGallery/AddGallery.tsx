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
import { useCreateProfileMutation } from '../../store/services/api/profile/profile.api';
import { useNavigate } from 'react-router-dom';
import configJson from '../../../plan-config.json'

function AddGallery() {
    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations } = useGetOrientationsQuery()
    const { data: galleryTypes } = useGetGalleryTypesQuery()
    const { selectedCity, cities, setGalleryTypes, setClassifications, countries, profileDescription, selectedCountry, selectedOrientations, selectedGalleryTypes, setCities, setCountries, setProfileDescription, setSelectedCity, setSelectedCountry, setGalleryName, setSelectedGalleryTypes, setOrientations, setSelectedOrientations, classifications, orientations, galleryName, selectedClassifications, setSelectedClassifications, types } = useManageProfile()
    const { setCitiesError, setCountriesError, galleryNameError,
        typesError, orientationsError, profileDescriptionError, setErrorClassification, setGalleryNameError, setGenderError, setOrientationsError, setProfileDescriptionError, setTypesError, genderError, classificationsError, citiesError, countriesError, } = useManageFormErrors()
    const navigate = useNavigate()
    const [createProfile, { data: cretedProfileData }] = useCreateProfileMutation()
    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))

    }

    useEffect(() => { console.log(cities) }, [cities])

    useEffect(() => { parseJson() }, [])
    useEffect(() => {
        if (selectedCountry.value !== '0') {
            setCities(json[selectedCountry.value].map(el => ({ label: el.name, value: el.name, lat: el.lat, lng: el.lng })))
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

    useEffect(() => {
        if (cretedProfileData) {
            navigate('/clients/look-for')
        }
    }, [cretedProfileData])

    const clickButton = () => {
        createProfile({
            role: 'GALLERY',
            profileDescription,
            classifications: selectedClassifications.map(el => Number(el.value)),
            galleryName,
            orientations: selectedOrientations.map(el => Number(el.value)),
            galleryTypes: selectedGalleryTypes.map(el => Number(el.value)),
            lat: Number(selectedCity.lat),
            lng: Number(selectedCity.lng),

        })

    }
    useEffect(() => {
        if (!(selectedCity.value === '0' && selectedClassifications.length === 0 && selectedOrientations.length === 0 && selectedGalleryTypes.length === 0 && !galleryName && selectedCountry.value === '0')) {


            if (selectedCity.value === '0') {
                setCitiesError('Choose city')
            } else {
                setCitiesError('')
            }

            if (selectedClassifications.length === 0) {
                setErrorClassification('Choose at least 1 item!')
            } else if (selectedClassifications.length > configJson.standard.maxClassifications) {
                setErrorClassification(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setErrorClassification('')
            }

            if (selectedOrientations.length === 0) {
                setOrientationsError('Choose at least 1 item!')
            } else if (
                selectedOrientations.length > configJson.standard.maxClassifications
            ) {
                setOrientationsError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setOrientationsError('')
            }

            if (selectedGalleryTypes.length === 0) {
                setTypesError('Choose at least 1 item!')
            } else if (selectedGalleryTypes.length > configJson.standard.maxClassifications) {
                setTypesError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setTypesError('')
            }

            if (!galleryName) {
                setGalleryNameError("Gallery name shouldn't be empty!")
            } else if (galleryName.length > 40) {
                setGalleryNameError('Max length is 40!')
            }
            else {
                setGalleryNameError('')
            }


            if (selectedCountry.value === '0') {
                setCountriesError('Choose country')
            } else {
                setCountriesError('')
            }
        }



    }, [galleryName, selectedCity.value, selectedClassifications.length, selectedCountry.value, selectedGalleryTypes.length, selectedOrientations.length])

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
            <NavigationSteps disabled={!(!citiesError && !classificationsError && !countriesError && !orientationsError && !typesError && !galleryNameError && citiesError !== null && classificationsError !== null && countriesError !== null && orientationsError !== null && typesError !== null && galleryNameError !== null)} onContinue={clickButton} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddGallery;
