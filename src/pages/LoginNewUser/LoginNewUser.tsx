import { useEffect, useState } from 'react';
import InputWithImage from '../../components/inputs/InputWithImage/InputWithImage';
import styles from './LoginNewUser.module.scss'
import emailIcon from '../../images/email.svg'
import passwordIcon from '../../images/password.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterNewUserMutation } from '../../store/services/admin-api/auth/auth.api';
import { setNewUser } from '../../store/services/admin-api/auth/auth.slice';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import PersonImg from '../../images/icons/person.svg'
import { useRegisterNewAdminMutation } from '../../store/services/admin-api/admins/adminApi';

function LoginNewUser() {
    const [error, setError] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [isPasswordError, setIsPasswordError] = useState<boolean>(false)
    const [isEmailError, setIsEmailError] = useState<boolean>(false)
    const [isNameError, setIsNameError] = useState<boolean>(false)


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerNewUser, { data: registerData, isSuccess: isRegisterSuccess, error: registrationError }] =
        useRegisterNewUserMutation();
    const [registerNewAdmin, { data: registerAdminData, isSuccess: isAdminRegSuccessful, error: adminRegistrationError }] =
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
            setError(registrationError.data.message)
            setIsEmailError(true)
            setIsNameError(true)
            setIsPasswordError(true)

        }
        if (adminRegistrationError) {
            setError(adminRegistrationError.data.message)
            setIsEmailError(true)
            setIsNameError(true)
            setIsPasswordError(true)

        }
    }, [registrationError, adminRegistrationError])


    useEffect(() => {
        if (isRegisterSuccess) {
            dispatch(setNewUser({ added_user_access_token: registerData.accessToken }));
            navigate('/clients/photos/add');
        }

    }, [isRegisterSuccess, registerData])

    useEffect(() => {


        if (isAdminRegSuccessful) {
            navigate('/admins');
        }
    }, [isAdminRegSuccessful, registerAdminData])



    return (
        <AdminLayout headerRight={
            null} navigationItems={[`${location.pathname.includes('admin') ? 'All Admins' : 'All Clients'}`, 'Registration']} pageHeader='Registration' >
            <div className={styles.inputs_container}>
                <InputWithImage maxLength={30} type='text' imgHEight='16px' imgWidth='16px' isError={isNameError} data={name} setData={setName} placeholder='Art Date' img={PersonImg} marginTop={'22px'} marginLeft={'11px'} />
                <InputWithImage type='text' imgHEight='10px' imgWidth='12px' isError={isEmailError} data={email} setData={setEmail} placeholder='Art@dating.com' img={emailIcon} marginTop={'26px'} marginLeft={'13px'} />
                <InputWithImage type='password' isError={isPasswordError} imgHEight='16px' imgWidth='16px' data={password} setData={setPassword} placeholder='Password' img={passwordIcon} marginTop={'22px'} marginLeft={'11px'} />
                <p className={styles.login__error_massage}>{error}</p>
            </div>

            <NavigationSteps onContinue={() => {
                clickButton()
            }} stepNumber={1} totalAmountSteps={location.pathname.includes('admin') ? 1 : 4} />
        </AdminLayout >
    )
}

export default LoginNewUser;
