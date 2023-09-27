import UserProfileInfoCard from '../../components/info-cards/UserProfileInfoCard/UserProfileInfoCard';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import UserInfoList from '../../components/lists/UserInfoList/UserInfoList';
import logo from '../../images/logo_2.svg'
import styles from './UserInfo.module.scss'
import EditIcon from '../../images/icons/edit.svg'

import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';


function UserInfo() {

    return (
        <AdminLayout headerRight={
            <> <SectionHeaderButton icon={EditIcon} text={'EDIT PROFILE'} clickButton={() => { console.log('User edited') }} background={'#0077EB'} color={'#ffff'} />

            </>

        } navigationItems={['All clients','FirsNAme LastName']} pageHeader='User profile'  >
            <div className={styles.user_info}>

                <UserProfileInfoCard avatar={logo} name={'My name'} role={'Collector'} />
                <UserInfoList />
            </div>

        </AdminLayout>




    )
}

export default UserInfo;
