import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddGalleryClassifications.module.scss'
import { useEffect, useState } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery, useGetGalleryTypesQuery, useGetOrientationsQuery } from '../../store/services/api/classifications/classifications.api';
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { useSetLookingForMutation } from '../../store/services/api/profile/profile.api';
import { useDispatch, useSelector } from 'react-redux';
import { logoutNewUser, setGalleryClassifications, setIsCreatedUserViewed } from '../../store/services/admin-api/user/user.slice';
import configJson from '../../../plan-config.json'
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { ProfileCreationSteps, selectLocationsConfig, setCurrentStep } from '../../store/services/application/location/location.slice';
import MainLoader from '../../components/loaders/AllPageLoader/AllPageLoader';

function AddGalleryClassifications() {
    UseManageStepsNAvigation()

    const { data: galleryClassifications, error: classificationReqError, isLoading: isClassificationsLoading } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations, error: orientationsReqErr, isLoading: isOrientationsLoading } = useGetOrientationsQuery()
    const { data: galleryTypes, error: typesReqError, isLoading: isGalleryTypesLoading } = useGetGalleryTypesQuery()
    const { setGalleryTypes, setClassifications, selectedOrientations, selectedGalleryTypes, setSelectedGalleryTypes, setOrientations, setSelectedOrientations, classifications, orientations, selectedClassifications, setSelectedClassifications, types } = useManageProfile()
    const { typesError, orientationsError, setErrorClassification, setOrientationsError, setTypesError, classificationsError } = useManageFormErrors()
    const { currentStep } = useSelector(selectLocationsConfig)

    const dispatch = useDispatch()
    const [postLookingFor, { status, error, isLoading }] = useSetLookingForMutation()

    useEffect(() => {
        if (error || (orientationsReqErr && orientationsReqErr.status === 401) || (classificationReqError && classificationReqError.status === 401) || (typesReqError && typesReqError.status === 401)) {
            dispatch(logoutNewUser())
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOGIN }))
        }
    }, [classificationReqError, error, orientationsReqErr, typesReqError])

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


    const clickButton = async () => {
        dispatch(setGalleryClassifications({
            galleryClassifications: selectedClassifications.map(el => Number(el.value)),
            galleryOrientations: selectedOrientations.map(el => Number(el.value)),
            galleryTypes: selectedGalleryTypes.map(el => Number(el.value))
        }))

        dispatch(setIsCreatedUserViewed({ isViewed: false }))

        if (currentStep !== ProfileCreationSteps.LOOK_FOR_GALLERY_ARTIST) {
            await postLookingFor({
                filters: {
                    galleryClassifications: selectedClassifications.map(el => Number(el.value)),
                    galleryTypes: selectedGalleryTypes.map(el => Number(el.value)),
                    orientations: selectedOrientations.map(el => Number(el.value))
                },
                preferences: { isLookingForGallery: true }
            })
        } else {

            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR_ARTIST }))

        }


    }

    const checkFields = () => {
        if (selectedClassifications.length === 0 || selectedClassifications.length > 5 || selectedOrientations.length === 0 || selectedOrientations.length > 5 || selectedGalleryTypes.length === 0 || selectedGalleryTypes.length > 5) {
            if (selectedClassifications.length === 0) {
                setErrorClassification('Choose classifications')
            } else if (selectedClassifications.length > 5) {
                setErrorClassification(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setErrorClassification('')
            }

            if (selectedOrientations.length === 0) {
                setOrientationsError('Choose orientations')
            } else if (selectedOrientations.length > 5) {
                setOrientationsError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setOrientationsError('')
            }

            if (selectedGalleryTypes.length === 0) {
                setTypesError('Choose types')
            } else if (selectedGalleryTypes.length > 5) {
                setTypesError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setTypesError('')
            }

        } else {
            clickButton()
        }

    }
    useEffect(() => {

        if (typesError !== null) {
            if (selectedGalleryTypes.length === 0) {
                setTypesError('Choose types')
            } else if (selectedGalleryTypes.length > 5) {
                setTypesError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setTypesError('')
            }
        }
    }, [selectedGalleryTypes.length, setTypesError])

    useEffect(() => {

        if (orientationsError !== null) {
            if (selectedOrientations.length === 0) {
                setOrientationsError('Choose orientations')
            } else if (selectedOrientations.length > 5) {
                setOrientationsError(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setOrientationsError('')
            }
        }
    }, [selectedOrientations.length, setOrientationsError])

    useEffect(() => {

        if (classificationsError !== null) {
            if (selectedClassifications.length === 0) {
                setErrorClassification('Choose classifications')
            } else if (selectedClassifications.length > 5) {
                setErrorClassification(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)
            } else {
                setErrorClassification('')
            }
        }
    }, [selectedClassifications.length, setErrorClassification])

    useEffect(() => {
        if (status === 'fulfilled') {
            if (currentStep === ProfileCreationSteps.LOOK_FOR_GALLERY_ARTIST) {
                dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR_ARTIST }))
            } else {
                dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.PROFILE }))
            }
        }
    }, [status])

    const [activeDropdownNumber, setActiveDropdownNumber] = useState<number>()

    return (
        <AdminLayout isBackButtonVisible={true} onBackButtonClick={() => {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR }))
        }} headerRight={
            null} navigationItems={['Gallery', 'User name', 'Look For']} pageHeader='Gallery'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(1) }}>
                        <MultiSelect isDropdownOpen={activeDropdownNumber === 1 ? true : false} options={types} selectedOption={selectedGalleryTypes} setSelectedOption={setSelectedGalleryTypes} label={'Gallery type'} error={typesError} />
                    </div>
                </div>

                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(2) }}>
                        <MultiSelect isDropdownOpen={activeDropdownNumber === 2 ? true : false} error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>
                    <div className={styles.input_row_container} onClick={() => { setActiveDropdownNumber(3) }}>
                        <MultiSelect isDropdownOpen={activeDropdownNumber === 3 ? true : false} error={orientationsError} options={orientations} selectedOption={selectedOrientations} setSelectedOption={setSelectedOrientations} label={'Art Orientations'} />
                    </div>
                </div>

            </div>
            <MainLoader isLoading={isLoading || isClassificationsLoading || isGalleryTypesLoading || isOrientationsLoading} />


            <NavigationSteps disabled={false} onContinue={checkFields} stepNumber={6} totalAmountSteps={6} />
        </AdminLayout>

    )
}

export default AddGalleryClassifications;
