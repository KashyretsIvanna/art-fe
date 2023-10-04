import UserProfileInfoCard from '../../components/info-cards/UserProfileInfoCard/UserProfileInfoCard';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import UserInfoList from '../../components/lists/UserInfoList/UserInfoList';
import logo from '../../images/logo_2.svg'
import styles from './UserInfo.module.scss'
import EditIcon from '../../images/icons/edit.svg'

import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetUserByIdQuery } from '../../store/services/userApi';


function UserInfo() {

    const params = useParams()
    const [lookingFor, setLookingFor] = useState<string[]>([])

    const { data } = useGetUserByIdQuery({ userId: params.id ? +params.id : 1 })



    useEffect(() => {
        let arrayOfRoles: string[] = [];
        if (data?.user.isLookingForArtist) {
            arrayOfRoles.push('Artist')
        }
        if (data?.user.isLookingForGallery) {
            arrayOfRoles.push('Gallery')
        }
        if (data?.user.isLookingForCollector) {
            arrayOfRoles.push('Collector')
        }
        setLookingFor(arrayOfRoles)
        arrayOfRoles = []
    }, [data])

    return (
        <AdminLayout headerRight={
            <> <SectionHeaderButton icon={EditIcon} text={'EDIT PROFILE'} clickButton={() => { console.log('User edited') }} background={'#0077EB'} color={'#ffff'} />

            </>

        } navigationItems={['All clients', data?.user.name || 'Name']} pageHeader='User profile'  >
            {data ? <div className={styles.user_info}>

                <UserProfileInfoCard imgId={data.user.profilePhoto} plan={data.user.plan} avatar={logo} name={data.user.name} role={data.user.role} />
                <UserInfoList email={data.user.email} country={data.user.country || ''} city={data.user.city || ''} age={1234} gender={data.user.gender || ''} status={'unknown status'} about={data.user.profileDescription || ''} lookingFor={lookingFor} />
            </div> : <>User not found</>}

        </AdminLayout>




    )
}

export default UserInfo;
