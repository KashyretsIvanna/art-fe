import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddArtistClassifications.module.scss'
import { useEffect } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery } from '../../store/services/api/classifications/classifications.api';
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { logoutNewUser, selectAddedUserData, setArtistClassifications, setIsCreatedUserViewed } from '../../store/services/admin-api/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useSetLookingForMutation } from '../../store/services/api/profile/profile.api';
import configJson from '../../../plan-config.json'
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { ProfileCreationSteps, setCurrentStep } from '../../store/services/application/location/location.slice';
function AddArtistClassifications() {
    const { data: galleryClassifications, error: classificationReqError } = useGetClassificationsQuery({ role: 'ARTIST' })
    const { setClassifications, classifications, selectedClassifications, setSelectedClassifications } = useManageProfile()
    const { setErrorClassification, classificationsError } = useManageFormErrors()
    const newUserData = useSelector(selectAddedUserData)
    const dispatch = useDispatch()
    UseManageStepsNAvigation()

    const [postLookingFor, { status, error }] = useSetLookingForMutation()

    useEffect(() => {
        if (error || (classificationReqError && classificationReqError.status === 401)) {
            dispatch(logoutNewUser())
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOGIN }))


        }
    }, [classificationReqError, error])

    useEffect(() => {
        if (status === 'fulfilled') {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.PROFILE }))
        }
    }, [status])

    useEffect(() => {
        if (galleryClassifications) {
            setClassifications(galleryClassifications.map((el: { id: number; classificationName: string; }) => ({
                value: el.id.toString(),
                label: el.classificationName
            })))
        }
    }, [galleryClassifications, setClassifications])

    const clickButton = () => {
        postLookingFor({
            filters: {
                artistClassifications: selectedClassifications.map(el => Number(el.value)),
                galleryClassifications: newUserData.galleryClassifications,
                galleryTypes: newUserData.galleryTypes,
                orientations: newUserData.galleryOrientations
            }, preferences: {
                isLookingForArtist: true,
                isLookingForGallery: newUserData.lookFor.includes('GALLERY') ? true : undefined
            }
        })
        dispatch(setArtistClassifications({
            artistClassifications: selectedClassifications.map(el => Number(el.value)),
        }))
        dispatch(setIsCreatedUserViewed({ isViewed: false }))


    }



    useEffect(() => {


        if (classifications.length) {
            if (selectedClassifications.length === 0) {
                setErrorClassification('Choose classifications')
            } else if (selectedClassifications.length > configJson.standard.maxClassifications) {
                setErrorClassification(`You can’t choose more than ${configJson.standard.maxClassifications} items!`)

            } else {
                setErrorClassification('')
            }
        }




    }, [selectedClassifications.length])

    return (
        <AdminLayout
            onBackButtonClick={() => {
                if (newUserData.lookFor.some(el => el === 'GALLERY')) {
                    dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR_GALLERY_ARTIST }))
                } else {
                    dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR }))
                }
            }}
            isBackButtonVisible={true} headerRight={
                null} navigationItems={['Artist', 'User name']} pageHeader='Artist'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>
            </div>

            <NavigationSteps disabled={selectedClassifications.length === 0 || selectedClassifications.length > configJson.standard.maxClassifications} onContinue={clickButton} stepNumber={6} totalAmountSteps={6} />
        </AdminLayout>




    )
}

export default AddArtistClassifications;
