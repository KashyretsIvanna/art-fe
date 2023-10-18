import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import GridPhotoContainer from '../../components/info-cards/GridPhotoContainer/GridPhotoContainer';
import styles from './AddPhotos.module.scss'
function AddPhotos() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const clickButton = () => {

    }

    return (
        <AdminLayout headerRight={
            null} navigationItems={['All Clients', 'Add photos']} pageHeader='Add Photos' >

            <div className={styles.add_photos}>
                <p className={styles.add_photos__description}>Add at least 1 photo to continue to reorder your photos, use drag&drop</p>
                <GridPhotoContainer /></div>


            <NavigationSteps onContinue={() => {
                clickButton()
            }} stepNumber={2} totalAmountSteps={4} />
        </AdminLayout >
    )
}

export default AddPhotos;
