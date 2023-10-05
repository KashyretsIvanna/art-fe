import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import styles from './AddUser.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setRole } from '../../store/services/user/user.slice';
const roles = [
    { value: 'ARTIST', label: 'Artist' },
    { value: 'GALLERY', label: 'Gallery' },
    { value: 'COLLECTOR', label: 'Art Dealer' },


];



function AddUser() {
    const addedUser = useSelector(selectAddedUserData);

    const [selectedRole, setSelectedRole] = useState<{
        value: string;
        label: string;
    }>(roles[0]);
    const addedUserData = useSelector(selectAddedUserData)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(addedUserData)
    }, [addedUserData])


    const changeRole = (role: {
        value: string;
        label: string;
    }) => {
        console.log(addedUserData)
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
                <InputPopup options={roles} onChange={changeRole} label={'Select user'} />
            </div>
            <NavigationSteps stepNumber={1} totalAmountSteps={3} />


        </AdminLayout >

    )
}

export default AddUser;
