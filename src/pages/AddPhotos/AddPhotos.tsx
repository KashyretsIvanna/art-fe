import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import GridPhotoContainer from '../../components/info-cards/GridPhotoContainer/GridPhotoContainer';
import styles from './AddPhotos.module.scss'
import { useEffect, useState } from 'react';
import { useAddPhotosMutation } from '../../store/services/api/profile/profile.api';
import ModalWithPhoto from '../../components/modals/Photo/Photo';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { useDispatch } from 'react-redux';
import { ProfileCreationSteps, setCurrentStep } from '../../store/services/application/location/location.slice';
import { logoutNewUser } from '../../store/services/admin-api/user/user.slice';


function AddPhotos() {
    UseManageStepsNAvigation()

    const [openedPhoto, setOpenedPhoto] = useState<string | undefined>()
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const [photoList, setPhotoList] = useState<{ file: (Blob | MediaSource) | null, order: number }[]>([])
    const [addPhoto, { error, status }] = useAddPhotosMutation()
    const dispatch = useDispatch()
    const [photosError, setPhotosError] = useState('')

    const clickButton = async () => {
        const results: any = []
        for (const el of photoList) {
            if (el.file) {
                const res = await addPhoto({ file: el.file, order: el.order })
                results.push(res)
            }
        }

        if (results.some(el => el.error && el.error.status === 413)) {
                setPhotosError('Photos are too large')
        }

        if (results.some(el => el.error && el.error.status !== 413)) {
            dispatch(logoutNewUser())
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOGIN }))
        }

        if (!results.some(el => el.error)) {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.CHOOSE_ROLE }))
        }
    }

    useEffect(() => {
        if (photoList.filter(el => el.file !== null).length) {
            setButtonDisabled(false)

        } else {
            setButtonDisabled(true)
        }
    }, [photoList])



    return (
        <AdminLayout isBackButtonVisible={false} headerRight={
            null} navigationItems={['All Clients', 'Add photos']} pageHeader='Add Photos' >

            {openedPhoto && <ModalWithPhoto closeModal={function (): void {
                setOpenedPhoto(undefined)
            }} img={openedPhoto} />}
            <div className={styles.add_photos}>
                <p className={styles.add_photos__description}>Add at least 1 photo to continue to reorder your photos, use drag&drop</p>
                <GridPhotoContainer setPhotoToOpen={setOpenedPhoto} setPhotoList={setPhotoList} /></div>

            <div className={styles.add_photos__error}>{photosError}</div>
            <NavigationSteps disabled={isButtonDisabled} onContinue={() => {
                clickButton()
            }} stepNumber={2} totalAmountSteps={6} />

        </AdminLayout >
    )
}

export default AddPhotos;
