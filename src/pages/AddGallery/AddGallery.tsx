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
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { useCreateProfileMutation } from '../../store/services/api/profile/profile.api';
import configJson from '../../../plan-config.json'
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { useDispatch } from 'react-redux';
import { setGalleryInfo, setRole } from '../../store/services/admin-api/user/user.slice';
import { ProfileCreationSteps, setCurrentStep } from '../../store/services/application/location/location.slice';

function AddGallery() {
    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations } = useGetOrientationsQuery()
    const { data: galleryTypes } = useGetGalleryTypesQuery()
    const { selectedCity, cities, setGalleryTypes, setClassifications, countries, profileDescription, selectedCountry, selectedOrientations, selectedGalleryTypes, setCities, setCountries, setProfileDescription, setSelectedCity, setSelectedCountry, setGalleryName, setSelectedGalleryTypes, setOrientations, setSelectedOrientations, classifications, orientations, galleryName, selectedClassifications, setSelectedClassifications, types } = useManageProfile()
    const { setCitiesError, setCountriesError, galleryNameError,
        typesError, orientationsError, profileDescriptionError, setErrorClassification, setGalleryNameError, setGenderError, setOrientationsError, setProfileDescriptionError, setTypesError, genderError, classificationsError, citiesError, countriesError, } = useManageFormErrors()
    const [createProfile, { data: cretedProfileData, error }] = useCreateProfileMutation()
    const parseJson = async () => {
        const regionNames = new Intl.DisplayNames(
            ['en'], { type: 'region' }
        );
        setCountries(Object.keys(json).map(el => ({ label: regionNames.of(el), value: el })))

    }

    useEffect(() => {
        if (error) {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOGIN }))

        }
    }, [error])
    
    const dispatch = useDispatch()
    UseManageStepsNAvigation()

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
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR }))
        }
    }, [cretedProfileData])

    const clickButton = async () => {
        dispatch(setGalleryInfo({
            profileDescription: profileDescription ?? null,
            artClassifications: selectedClassifications.map(el => Number(el.value)),
            galleryName: galleryName ?? null,
            artOrientations: selectedOrientations.map(el => Number(el.value)),
            galleryType: selectedGalleryTypes.map(el => Number(el.value)),
            lat: Number(selectedCity.lat),
            lng: Number(selectedCity.lng),
        }))
        await createProfile({
            role: 'GALLERY',
            profileDescription,
            classifications: selectedClassifications.map(el => Number(el.value)),
            galleryName,
            orientations: selectedOrientations.map(el => Number(el.value)),
            galleryTypes: selectedGalleryTypes.map(el => Number(el.value)),
            lat: Number(selectedCity.lat),
            lng: Number(selectedCity.lng),
            isLocationAuto: false


        })

    }

    const checkFields = () => {
        if (selectedCity.value === '0' || selectedClassifications.length === 0 || selectedClassifications.length > configJson.standard.maxClassifications || selectedOrientations.length === 0 || selectedOrientations.length > configJson.standard.maxClassifications || selectedGalleryTypes.length === 0 || selectedGalleryTypes.length > configJson.standard.maxClassifications || !galleryName || galleryName.length > 40 || selectedCountry.value === '0') {

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
        } else {
            console.log('c')
            clickButton()
        }

    }

    useEffect(() => {
        if (countriesError !== null) {
            if (selectedCountry.value === '0') {
                setCountriesError('Choose country')
            } else {
                setCountriesError('')
            }
        }
    }, [selectedCountry.value, setCountriesError])

    useEffect(() => {

        if (galleryNameError !== null) {
            if (!galleryName) {
                setGalleryNameError("Gallery name shouldn't be empty!")
            } else if (galleryName.length > 40) {
                setGalleryNameError('Max length is 40!')
            }
            else {
                setGalleryNameError('')
            }
        }
    }, [galleryName, setGalleryNameError])

    useEffect(() => {

        if (typesError !== null) {
            if (selectedGalleryTypes.length === 0) {
                setTypesError('Choose at least 1 item!')
            } else if (selectedGalleryTypes.length > configJson.standard.maxClassifications) {
                setTypesError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setTypesError('')
            }
        }

    }, [selectedGalleryTypes.length, typesError])

    useEffect(() => {

        if (orientationsError !== null) {
            if (selectedOrientations.length === 0) {
                setOrientationsError('Choose at least 1 item!')
            } else if (
                selectedOrientations.length > configJson.standard.maxClassifications
            ) {
                setOrientationsError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setOrientationsError('')
            }
        }

    }, [selectedOrientations.length, setOrientationsError])


    useEffect(() => {

        if (classificationsError !== null) {
            if (selectedClassifications.length === 0) {
                setErrorClassification('Choose at least 1 item!')
            } else if (selectedClassifications.length > configJson.standard.maxClassifications) {
                setErrorClassification(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setErrorClassification('')
            }
        }

    }, [selectedClassifications.length, setErrorClassification])



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
            null} navigationItems={['Gallery']} pageHeader='About me( Gallery )'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(1) }}>
                        <ReusableTextInput error={galleryNameError} label={'Gallery Name'} data={galleryName} setData={setGalleryName} placeholder={'Gallery name'} />
                    </div>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(2) }}>
                        <MultiSelect isDropdownOpen={activeDropdownNumber === 2 ? true : false} options={types} selectedOption={selectedGalleryTypes} setSelectedOption={setSelectedGalleryTypes} label={'Gallery type'} error={typesError} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(3) }}>
                        <InputPopup isDropdownOpen={activeDropdownNumber === 3 ? true : false} options={countries} onChange={setSelectedCountry} setSelectedOption={setSelectedCountry} selectedOption={selectedCountry} label={'Select Country'} error={countriesError} />
                    </div>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(4) }}>
                        <MultiSelect isDropdownOpen={activeDropdownNumber === 4 ? true : false} error={orientationsError} options={orientations} selectedOption={selectedOrientations} setSelectedOption={setSelectedOrientations} label={'Art Orientations'} />
                    </div>
                </div>

                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(5) }}>
                        <InputPopup isDropdownOpen={activeDropdownNumber === 5 ? true : false} options={cities} onChange={setSelectedCity} selectedOption={selectedCity} setSelectedOption={setSelectedCity} label={'Select City'} error={citiesError} />
                    </div>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(6) }}>
                        <MultiSelect isDropdownOpen={activeDropdownNumber === 6 ? true : false} error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>

            </div>
            <div className={styles.inputs_container__textarea} onClick={() => { setActiveDropdownNumber(7) }}>
                <ReusableTextArea error={profileDescriptionError} label={'Profile description'} data={profileDescription} setData={setProfileDescription} placeholder={'Text here...'} />
            </div>
            <NavigationSteps disabled={false} onContinue={checkFields} stepNumber={4} totalAmountSteps={6} />
        </AdminLayout>




    )
}

export default AddGallery;
