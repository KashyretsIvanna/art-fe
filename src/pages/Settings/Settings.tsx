import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'

function Settings() {


    return (
        <AdminLayout isBackButtonVisible={true} pageHeader='Settings' navigationItems={['Settings']} headerRight={<></>}>
            Settings
        </AdminLayout>
    )
}

export default Settings;
