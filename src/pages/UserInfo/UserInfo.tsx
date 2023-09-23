import UserProfileInfoCard from '../../components/info-cards/UserProfileInfoCard/UserProfileInfoCard';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import logo from '../../images/logo_2.svg'

function UserInfo() {

    return (
        <AdminLayout pageHeader='All Clients' >
            <UserProfileInfoCard avatar={logo} name={'My name'} role={'Collector'} />
            Here is info about user

        </AdminLayout>


    )
}

export default UserInfo;
