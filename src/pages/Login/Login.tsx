import { useEffect, useState } from 'react';
import InputWithImage from '../../components/inputs/InputWithImage/InputWithImage';
import styles from './Login.module.scss'
import emailIcon from '../../images/email.svg'
import passwordIcon from '../../images/password.svg'
import BigButton from '../../components/buttons/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../store/services/auth/auth.api';
import { setUser } from '../../store/services/auth/auth.slice';
import { routes } from '../../store/constants';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError }] =
        useLoginUserMutation();

    const clickButton = async () => {
        try {
            if (email && password) {
                await loginUser({ email, password });
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            dispatch(setUser({ access_token: loginData.accessToken }));
            navigate(routes.users);
        }
    })

    return (
        <div className={styles.layout}>
            <div className={styles.login_form}>
                <div className={styles.top_boarder}></div>
                <div className={styles.header}>
                    <p className={styles.big_header}>Admin Panel</p>
                    <p className={styles.small_header}>log in</p>
                </div>

                <div className={styles.inputs_container}>
                    <InputWithImage data={
                        email
                    } setData={setEmail} placeholder='Art@dating.com' img={emailIcon} />
                    <InputWithImage data={
                        password
                    } setData={setPassword} placeholder='Password' img={passwordIcon} />

                </div>

                <BigButton text='Log in' clickButton={() => clickButton()} />
            </div></div>

    )
}

export default Login;
