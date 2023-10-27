import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddArtistClassifications.module.scss'
import { useEffect } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery } from '../../store/services/api/classifications/classifications.api';
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';
import { removeNewUserData, selectAddedUserData } from '../../store/services/admin-api/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSetLookingForMutation } from '../../store/services/api/profile/profile.api';
import { logoutNewUser } from '../../store/services/admin-api/auth/auth.slice';
import configJson from '../../../plan-config.json'
function AddArtistClassifications() {
    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'ARTIST' })
    const { setClassifications, classifications, selectedClassifications, setSelectedClassifications } = useManageProfile()
    const { setErrorClassification, classificationsError } = useManageFormErrors()
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
    }

    useEffect(() => {
        if (status === 'fulfilled') {
            const createdUSerData = newUserData
            dispatch(removeNewUserData())
            dispatch(logoutNewUser())
            navigate(`/clients/${createdUSerData.createdUserId}`)
        }
    }, [status])

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
        <AdminLayout isBackButtonVisible={true} headerRight={
            null} navigationItems={['Artist', 'User name']} pageHeader='Artist'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>
            </div>

            <NavigationSteps disabled={selectedClassifications.length === 0 || selectedClassifications.length > configJson.standard.maxClassifications} onContinue={clickButton} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddArtistClassifications;
