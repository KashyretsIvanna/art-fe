import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'

function SendLetter() {


    return (
        <AdminLayout isBackButtonVisible={true} pageHeader='Send Letter' navigationItems={['Send letter']} headerRight={<></>}>
            SendLetter
        </AdminLayout>


    )
}

export default SendLetter;
