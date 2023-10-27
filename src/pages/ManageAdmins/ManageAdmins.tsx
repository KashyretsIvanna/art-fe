import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'

function ManageAdmins() {


    return (
        <AdminLayout isBackButtonVisible={true} pageHeader='Manage Admins' navigationItems={['Manage admins']} headerRight={<></>}>
            ManageAdmins
        </AdminLayout>


    )
}

export default ManageAdmins;
