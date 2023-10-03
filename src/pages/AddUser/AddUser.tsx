import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useState } from 'react';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import styles from './AddUser.module.scss'
const roles = [
    { value: 'ARTIST', label: 'Artist' },
    { value: 'GALLERY', label: 'Gallery' },
    { value: 'COLLECTOR', label: 'Art Dealer' },


];


function AddUser() {
    const [selectedRole, setSelectedRole] = useState<{
        value: string;
        label: string;
    }>(roles[0]);

    return (
        <AdminLayout headerRight={
            null} navigationItems={['All clients']} pageHeader='Add user'>

            <div className={styles.add_user__container}>
                <InputPopup options={roles} onChange={setSelectedRole} label={'Select user'} />
            </div>
            <NavigationSteps stepNumber={1} totalAmountSteps={3} />


        </AdminLayout >

    )
}

export default AddUser;
