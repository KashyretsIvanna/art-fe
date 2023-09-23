import UserProfileInfoCard from '../../components/info-cards/UserProfileInfoCard/UserProfileInfoCard';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import UserInfoList from '../../components/lists/UserInfoList/UserInfoList';
import logo from '../../images/logo_2.svg'
import styles from './UserInfo.module.scss'

function UserInfo() {

    return (
        <AdminLayout pageHeader='User profile' >
            <div className={styles.user_info}>

                <UserProfileInfoCard avatar={logo} name={'My name'} role={'Collector'} />
                <UserInfoList />
            </div>

        </AdminLayout>




    )
}

export default UserInfo;
