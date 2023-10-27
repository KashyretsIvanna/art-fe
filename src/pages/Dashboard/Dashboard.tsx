import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'

function Dashboard() {


    return (
        <AdminLayout isBackButtonVisible={true} pageHeader='Dashboard' headerRight={<></>} navigationItems={['Dashboard']} >
            Dashboard
        </AdminLayout>


    )
}

export default Dashboard;
