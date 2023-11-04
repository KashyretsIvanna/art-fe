import UserProfileInfoCard from '../../components/info-cards/UserProfileInfoCard/UserProfileInfoCard';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import UserInfoList from '../../components/lists/UserInfoList/UserInfoList';
import logo from '../../images/logo_2.svg'
import styles from './UserInfo.module.scss'
import EditIcon from '../../images/icons/edit.svg'

import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetUserByIdQuery } from '../../store/services/admin-api/user/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setIsCreatedUserViewed } from '../../store/services/admin-api/user/user.slice';


function UserInfo() {

    const params = useParams()
    const [lookingFor, setLookingFor] = useState<string[]>([])
    const addedUser = useSelector(selectAddedUserData)
    const { data } = useGetUserByIdQuery({ userId: params.id ? +params.id : 1 })
    const [isEditTurnOn, setIsEditTurnOn] = useState(false)
    const dispatch = useDispatch()




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

    useEffect(() => {
        if (addedUser.createdUserId === Number(params.id)
        ) {
            dispatch(setIsCreatedUserViewed({
                isViewed: true
            }))

        }
    }, [addedUser.createdUserId, dispatch, params.id])

    const onSaveChanges = () => {
        setIsEditTurnOn(false)
        console.log('save changes')
    }
    const onCancelChanges = () => {
        console.log('save changes')
    }

    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
            <> {isEditTurnOn ? <SectionHeaderButton icon={EditIcon} text={'SAVE CHANGES'} clickButton={onSaveChanges} background={'#0077EB'} color={'#ffff'} /> : <SectionHeaderButton icon={EditIcon} text={'EDIT PROFILE'} clickButton={() => { setIsEditTurnOn(true) }} background={'#0077EB'} color={'#ffff'} />}

            </>

        } navigationItems={['All clients', data?.user.name || 'Name']} pageHeader='User profile'  >
            {data ? <div className={styles.user_info}>

                <UserProfileInfoCard imgId={data ? data.user.userPhotos[0].id : []} plan={data.user.plan} avatar={logo} name={data.user.name} role={data.user.role} />
                <UserInfoList email={data.user.email} country={data.user.country || ''} city={data.user.city || ''} age={data.user.age || ''} gender={data.user.gender || ''} status={data.user.plan || ''} about={data.user.profileDescription || ''} lookingFor={lookingFor} isEdit={isEditTurnOn} onSaveChange={onSaveChanges} onCancelChanges={onCancelChanges} />
            </div> : <>User not found</>}

        </AdminLayout>




    )
}

export default UserInfo;
