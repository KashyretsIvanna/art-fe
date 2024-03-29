import { useEffect, useState } from 'react';
import InputWithImage from '../../components/inputs/InputWithImage/InputWithImage';
import styles from './LoginNewUser.module.scss'
import emailIcon from '../../images/email.svg'
import passwordIcon from '../../images/password.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import PersonImg from '../../images/icons/person.svg'
import { useRegisterNewAdminMutation } from '../../store/services/admin-api/admins/adminApi';
import { useRegisterNewUserMutation } from '../../store/services/api/profile/profile.api';
import { selectAddedUserData, selectNewUserAuthToken, setNewUser } from '../../store/services/admin-api/user/user.slice';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { ProfileCreationSteps, setCurrentStep } from '../../store/services/application/location/location.slice';
import MainLoader from '../../components/loaders/AllPageLoader/AllPageLoader';

function LoginNewUser() {
    if (!location.pathname.includes('admin')) {
        UseManageStepsNAvigation()
    }
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false)
    const [isEmailError, setIsEmailError] = useState<boolean>(false)
    const [isNameError, setIsNameError] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const newUserData = useSelector(selectAddedUserData)
    const authData = useSelector(selectNewUserAuthToken)

    const [registerNewUser, { data: registerData, isLoading, isSuccess: isRegisterSuccess, error: registrationError }] =
        useRegisterNewUserMutation();
    const [registerNewAdmin, { data: registerAdminData, isLoading: isLoadingAdmin, isSuccess: isAdminRegSuccessful, error: adminRegistrationError }] =
        useRegisterNewAdminMutation();


    const clickButton = async () => {
        if (location.pathname.includes('admin')) {
            await registerNewAdmin({ email, password, name })

        } else {
            await registerNewUser({ email, password, name });

        }

    }

    useEffect(() => {
        if (registrationError) {
            setError('Email already exists')
            setIsEmailError(true)
            setIsNameError(true)
            setIsPasswordError(true)

        }
        if (adminRegistrationError) {
            setError(adminRegistrationError.message)
            setIsEmailError(true)
            setIsNameError(true)
            setIsPasswordError(true)

        }
    }, [registrationError, adminRegistrationError])


    useEffect(() => {
        if (isRegisterSuccess) {
            dispatch(setNewUser({ added_user_access_token: registerData.tokens.accessToken, createdUserId: registerData.id , added_user_refresh_token:registerData.tokens.refreshToken}));
        }

    }, [isRegisterSuccess, registerData])

    useEffect(() => {
        if (isRegisterSuccess && authData && newUserData.createdUserId) {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.PHOTOS }))
        }
    }, [authData, isRegisterSuccess, navigate, newUserData.createdUserId])

    useEffect(() => {
        if (isAdminRegSuccessful) {
            navigate('/admins');
        }
    }, [isAdminRegSuccessful, registerAdminData])

    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
            null} navigationItems={[`${location.pathname.includes('admin') ? 'All Admins' : 'All Clients'}`, 'Registration']} pageHeader='Registration' >
            <div className={styles.inputs_container}>
                <InputWithImage maxLength={30} type='text' imgHEight='16px' imgWidth='16px' isError={isNameError} data={name} setData={setName} placeholder='Name' img={PersonImg} marginTop={'22px'} marginLeft={'11px'} />
                <InputWithImage type='text' imgHEight='10px' imgWidth='12px' isError={isEmailError} data={email} setData={setEmail} placeholder='Art@dating.com' img={emailIcon} marginTop={'26px'} marginLeft={'13px'} />
                <InputWithImage type='password' isError={isPasswordError} imgHEight='16px' imgWidth='16px' data={password} setData={setPassword} placeholder='Password' img={passwordIcon} marginTop={'22px'} marginLeft={'11px'} />
                <p className={styles.login__error_massage}>{error}</p>
            </div>
            <MainLoader isLoading={isLoading || isLoadingAdmin} />

            <NavigationSteps onContinue={() => {
                clickButton()
            }} stepNumber={1} totalAmountSteps={location.pathname.includes('admin') ? 1 : 6} />
        </AdminLayout >
    )
}

export default LoginNewUser;
