import { useEffect, useState } from 'react';
import InputWithImage from '../../components/inputs/InputWithImage/InputWithImage';
import styles from './Login.module.scss'
import emailIcon from '../../images/email.svg'
import passwordIcon from '../../images/password.svg'
import BigButton from '../../components/buttons/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../store/services/admin-api/auth/auth.api';
import { setUser } from '../../store/services/admin-api/auth/auth.slice';
import { routes } from '../../store/constants';
import logo from '../../images/logo_2.svg'
import MainLoader from '../../components/loaders/AllPageLoader/AllPageLoader';
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isLoading, isError }] =
        useLoginUserMutation();

    const clickButton = async () => {
        await loginUser({ email, password });
    }

    useEffect(() => {
        if (isLoginSuccess) {
            dispatch(setUser({ access_token: loginData.accessToken, refresh_token: loginData.refreshToken }));
            navigate(routes.listOfUsers);
        }
    })

    return (
        <div className={styles.layout}>

            <div className={styles.login__header}>
                <img className={styles.login__header_logo} src={logo} alt='logo' />
            </div>
            <div className={styles.login_form}>
                <div className={styles.top_boarder}></div>
                <div className={styles.header}>
                    <p className={styles.big_header}>Admin Panel</p>
                    <p className={styles.small_header}>log in</p>
                </div>

                <div className={styles.inputs_container}>
                    <InputWithImage type='text' imgHEight='10px' imgWidth='12px' isError={isError} data={email} setData={setEmail} placeholder='Art@dating.com' img={emailIcon} marginTop={'26px'} marginLeft={'13px'} />
                    <InputWithImage type='password' isError={isError} imgHEight='16px' imgWidth='16px' data={password} setData={setPassword} placeholder='Password' img={passwordIcon} marginTop={'22px'} marginLeft={'11px'} />
                    <div className={styles.login__error_massage}>{isError ? 'Wrong email or password' : ''}</div>
                </div>

                <BigButton text='Log in' clickButton={() => clickButton()} />
            </div>
            <div className={styles.login__footer}><div className={styles.login__footer_text}>Copyright © 2023 ART Dating Company S.L. All rights reserved.</div></div>

            <MainLoader isLoading={isLoading} />

        </div>

    )
}

export default Login;
