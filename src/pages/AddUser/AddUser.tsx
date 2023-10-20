import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import styles from './AddUser.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setRole } from '../../store/services/admin-api/user/user.slice';
import { useNavigate } from 'react-router-dom';
const roles = [
    { value: 'ARTIST', label: 'Artist' },
    { value: 'GALLERY', label: 'Gallery' },
    { value: 'COLLECTOR', label: 'Art Dealer' },


];

function AddUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addedUserData = useSelector(selectAddedUserData)
    const [selectedRole, setSelectedRole] = useState<{
        value: string;
        label: string;
    }>(roles[0]);



    const changeRole = (role: {
        value: string;
        label: string;
    }) => {

        dispatch(setRole({
            role: role.value,
        }))
        setSelectedRole(role)
    }

    useEffect(() => {
        setSelectedRole(roles.filter(el => el.value === addedUserData.role)[0])
    }, [])

    return (
        <AdminLayout headerRight={
            null} navigationItems={['All clients']} pageHeader='Add user'>

            <div className={styles.add_user__container}>
                <InputPopup selectedOption={selectedRole} setSelectedOption={setSelectedRole} options={roles} onChange={changeRole} label={'Select user'} />
            </div>
            <NavigationSteps disabled={false} stepNumber={2} totalAmountSteps={4} onContinue={function (): void {
                if (selectedRole.value === 'COLLECTOR') {
                    navigate('/clients/collector')

                } else if (selectedRole.value === 'GALLERY') {
                    navigate('/clients/gallery')

                } if (selectedRole.value === 'ARTIST') {
                    navigate('/clients/artist')

                }
            }} />


        </AdminLayout >

    )
}

export default AddUser;
