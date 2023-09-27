import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'

function Dashboard() {


    return (
        <AdminLayout pageHeader='Dashboard' headerRight={<></>} navigationItems={['Dashboard']} >
            Dashboard
        </AdminLayout>


    )
}

export default Dashboard;
