import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'

function Users() {


    return (
        <AdminLayout isBackButtonVisible={true} navigationItems={['Users']} pageHeader='Users' headerRight={<></>}>
            Users
        </AdminLayout>


    )
}

export default Users;
