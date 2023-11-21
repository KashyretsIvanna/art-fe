import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import InputPopup from '../../components/inputs/InputSelect/InputSelect';
import { useEffect, useState } from 'react';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import styles from './AddUser.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setRole } from '../../store/services/admin-api/user/user.slice';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { ProfileCreationSteps, selectLocationsConfig, setCurrentStep } from '../../store/services/application/location/location.slice';
const roles = [
    { value: 'ARTIST', label: 'Artist' },
    { value: 'GALLERY', label: 'Gallery' },
    { value: 'COLLECTOR', label: 'Art Dealer' }
];

function AddUser() {
    UseManageStepsNAvigation()

    const dispatch = useDispatch()
    const addedUserData = useSelector(selectAddedUserData)
    const { currentStep } = useSelector(selectLocationsConfig)

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
        if (currentStep === ProfileCreationSteps.CHOOSE_ROLE) {
            if (addedUserData.role === 'COLLECTOR') {
                dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.COLLECTOR }))
            } else if (addedUserData.role === 'GALLERY') {
                dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.GALLERY }))
            } if (addedUserData.role === 'ARTIST') {
                dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.ARTIST }))

            }
        }
    }, [addedUserData.role])

    return (
        <AdminLayout isBackButtonVisible={false} headerRight={
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
