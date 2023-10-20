import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import GridPhotoContainer from '../../components/info-cards/GridPhotoContainer/GridPhotoContainer';
import styles from './AddPhotos.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiRoutes } from '../../store/constants';
import { baseApiUrl } from '../../store/constants/api.constants';
import { useAddPhotosMutation } from '../../store/services/api/profile/profile.api';
function AddPhotos() {
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const [photoList, setPhotoList] = useState<{ file: (Blob | MediaSource) | null, order: number }[]>([])
    const [addPhoto, { data, isLoading, error }] = useAddPhotosMutation()

    useEffect(() => {
        console.log(data)
        console.log(error)

    }, [data, error])
    const navigate = useNavigate()
    const clickButton = () => {
        console.log('click')
        photoList.forEach(async (el, index) => {
            if (el.file) {
                addPhoto(el)
            }
        })
        navigate('/clients/add')
    }


    useEffect(() => {
        if (photoList.filter(el => el.file !== null).length) {
            setButtonDisabled(false)

        } else {
            setButtonDisabled(true)
        }
    }, [photoList])


    return (
        <AdminLayout headerRight={
            null} navigationItems={['All Clients', 'Add photos']} pageHeader='Add Photos' >

            <div className={styles.add_photos}>
                <p className={styles.add_photos__description}>Add at least 1 photo to continue to reorder your photos, use drag&drop</p>
                <GridPhotoContainer setPhotoList={setPhotoList} /></div>


            <NavigationSteps disabled={isButtonDisabled} onContinue={() => {
                clickButton()
            }} stepNumber={2} totalAmountSteps={4} />
        </AdminLayout >
    )
}

export default AddPhotos;
