import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddGalleryClassifications.module.scss'
import { useEffect } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery, useGetGalleryTypesQuery, useGetOrientationsQuery } from '../../store/services/api/classifications/classifications.api';
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { useSetLookingForMutation } from '../../store/services/api/profile/profile.api';
import { useDispatch, useSelector } from 'react-redux';
import { removeNewUserData, selectAddedUserData, setGalleryClassifications } from '../../store/services/admin-api/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { logoutNewUser } from '../../store/services/admin-api/auth/auth.slice';
import configJson from '../../../plan-config.json'

function AddGalleryClassifications() {
    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations } = useGetOrientationsQuery()
    const { data: galleryTypes } = useGetGalleryTypesQuery()
    const { setGalleryTypes, setClassifications, selectedOrientations, selectedGalleryTypes, setSelectedGalleryTypes, setOrientations, setSelectedOrientations, classifications, orientations, selectedClassifications, setSelectedClassifications, types } = useManageProfile()
    const { typesError, orientationsError, setErrorClassification, setOrientationsError, setTypesError, classificationsError } = useManageFormErrors()
    const newUserData = useSelector(selectAddedUserData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [postLookingFor, { status }] = useSetLookingForMutation()

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
        dispatch(setGalleryClassifications({
            galleryClassifications: selectedClassifications.map(el => Number(el.value)),
            galleryOrientations: selectedOrientations.map(el => Number(el.value)),
            galleryTypes: selectedGalleryTypes.map(el => Number(el.value))
        }))
    }, [selectedClassifications, selectedGalleryTypes, selectedOrientations])

    const clickButton = () => {

        if (newUserData.lookFor.includes('ARTIST')) {
            navigate('/clients/artist/look-for')
        } else {
            postLookingFor({
                filters: {
                    galleryClassifications: selectedClassifications.map(el => Number(el.value)),
                    galleryTypes: selectedGalleryTypes.map(el => Number(el.value)),
                    orientations: selectedOrientations.map(el => Number(el.value))
                },
                preferences: { isLookingForGallery: true }
            })

        }

    }



    useEffect(() => {
        if (!((selectedClassifications.length === 0 && selectedOrientations.length === 0 && selectedGalleryTypes.length === 0))) {

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

        }



    }, [selectedClassifications.length, selectedGalleryTypes.length, selectedOrientations.length])



    useEffect(() => {
        if (status === 'fulfilled') {
            const createdUSerData = newUserData
            dispatch(removeNewUserData())
            dispatch(logoutNewUser())
            navigate(`/clients/${createdUSerData.createdUserId}`)
        }
    }, [status])

    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
            null} navigationItems={['Gallery', 'User name', 'Look For']} pageHeader='Gallery'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect options={types} selectedOption={selectedGalleryTypes} setSelectedOption={setSelectedGalleryTypes} label={'Gallery type'} error={typesError} />
                    </div>
                </div>

                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={orientationsError} options={orientations} selectedOption={selectedOrientations} setSelectedOption={setSelectedOrientations} label={'Art Orientations'} />
                    </div>
                </div>

            </div>

            <NavigationSteps disabled={!(!classificationsError && !orientationsError && !typesError && classificationsError !== null && orientationsError !== null && typesError !== null)} onContinue={clickButton} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddGalleryClassifications;
