import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import styles from './AddUser.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setRole } from '../../store/services/admin-api/user/user.slice';
import { useNavigate } from 'react-router-dom';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
const roles = [
    { value: 'ARTIST', label: 'Artist' },
    { value: 'GALLERY', label: 'Gallery' },
    { value: 'COLLECTOR', label: 'Art Dealer' }
];

function AddUser() {
    UseManageStepsNAvigation()

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
        setSelectedRole(role)
    }

    useEffect(() => {
        setSelectedRole(roles.filter(el => el.value === addedUserData.role)[0])
    }, [])

    useEffect(() => {
        if (addedUserData.role === 'COLLECTOR') {

            navigate('/clients/collector')

        } else if (addedUserData.role === 'GALLERY') {
            navigate('/clients/gallery')

        } if (addedUserData.role === 'ARTIST') {
            navigate('/clients/artist')

        }
    }, [addedUserData.role])

    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
            null} navigationItems={['All clients']} pageHeader='Add user'>

            <div className={styles.add_user__container}>
                <InputPopup selectedOption={selectedRole} setSelectedOption={setSelectedRole} options={roles} onChange={changeRole} label={'Select user'} error={''} />
            </div>
            <NavigationSteps disabled={false} stepNumber={3} totalAmountSteps={6} onContinue={function (): void {
                dispatch(setRole({
                    role: selectedRole.value,
                }))
            }} />


        </AdminLayout >

    )
}

export default AddUser;
