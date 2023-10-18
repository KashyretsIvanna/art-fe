import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import GridPhotoContainer from '../../components/info-cards/GridPhotoContainer/GridPhotoContainer';
import styles from './AddPhotos.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddPhotoMutation } from '../../store/services/api/profile/profile.api';
import axios from 'axios';
import { ApiRoutes } from '../../store/constants';
import { baseApiUrl } from '../../store/constants/api.constants';
function AddPhotos() {
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const [addPhoto, { isError, error, data }] = useAddPhotoMutation()
    const [photoList, setPhotoList] = useState<{ file: (Blob | MediaSource) | null, order: number }[]>([])

    const navigate = useNavigate()
    const clickButton = () => {
        console.log('click')
        photoList.forEach(async (el, index) => {

            if (el.file) {
                const formData = new FormData();
                formData.append("photo", el.file as Blob);
                formData.append("order", el.order);

                try {
                    console.log(localStorage)
                    const response = await axios({
                        method: "post",
                        url: baseApiUrl + '/api' + ApiRoutes.PROFILE + '/photo',
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${JSON.parse(localStorage.getItem('persist:user')).added_user_access_token.slice(1, -1)}` },
                    });
                    console.log(response)

                } catch (error) {
                    console.log(error)
                }



            }
        })
        navigate('/clients/add')



    }


    useEffect(() => {
        console.log(error)
    }, [isError])

    useEffect(() => {
        if (data) {
            navigate('/clients/add')

        }
    }, [data])


    useEffect(() => {
        console.log(photoList)

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
