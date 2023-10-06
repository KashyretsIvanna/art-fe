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

function LoginNewUser() {
    const [error, setError] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerNewUser, { data: registerData, isSuccess: isRegisterSuccess, error: registrationError }] =
        useRegisterNewUserMutation();

    const clickButton = async () => {
        if (password && name && email && !error) {
            await registerNewUser({ email, password, name });
        }

    }
    useEffect(() => {
        if (registrationError) {
            setError(registrationError.data.message)
        }
    }, [registrationError])

    const onChangeInputs = () => {
        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const oneSpecCharacter = /[?=.*]/g
        const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g


        if (password && !password.match(lowerCaseLetters)) {
            setError('Password should contain lowercase letter')
        } else if (password && !password.match(upperCaseLetters)) {
            setError('Password should contain uppercase letter')
        } else if (password && !password.match(numbers)) {
            setError('Password should contain numbers')
        } else if (password && password.length < 8) {
            setError('Minimum password length ')
        } else if (password && !password.match(oneSpecCharacter)) {
            setError('Minimum one special character')
        } else if (email && !email.match(emailRegExp)) {
            setError('Bad email')
        } else {
            setError('')
        }
    }


    useEffect(() => {
        onChangeInputs()
    }, [password, email])



    useEffect(() => {
        if (isRegisterSuccess) {
            dispatch(setNewUser({ added_user_access_token: registerData.accessToken }));
            navigate('/clients/add');
        }
    }, [isRegisterSuccess, registerData])



    return (
        <AdminLayout headerRight={
            null} navigationItems={['All Clients', 'Login']} pageHeader='Login' >
            <div className={styles.inputs_container}>
                <InputWithImage maxLength={30} type='text' imgHEight='16px' imgWidth='16px' isError={error ? true : false} data={name} setData={setName} placeholder='Art Date' img={PersonImg} marginTop={'22px'} marginLeft={'11px'} />
                <InputWithImage type='text' imgHEight='10px' imgWidth='12px' isError={error ? true : false} data={email} setData={setEmail} placeholder='Art@dating.com' img={emailIcon} marginTop={'26px'} marginLeft={'13px'} />
                <InputWithImage type='password' isError={error ? true : false} imgHEight='16px' imgWidth='16px' data={password} setData={setPassword} placeholder='Password' img={passwordIcon} marginTop={'22px'} marginLeft={'11px'} />
                <p className={styles.login__error_massage}>{error}</p>
            </div>

            <NavigationSteps onContinue={() => {
                clickButton()
            }} stepNumber={1} totalAmountSteps={4} />
        </AdminLayout >
    )
}

export default LoginNewUser;
