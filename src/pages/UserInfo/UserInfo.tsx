import UserProfileInfoCard from '../../components/info-cards/UserProfileInfoCard/UserProfileInfoCard';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import UserInfoList from '../../components/lists/UserInfoList/UserInfoList';
import logo from '../../images/logo_2.svg'
import styles from './UserInfo.module.scss'
import EditIcon from '../../images/icons/edit.svg'
import MailImg from '../../images/icons/mail.svg'
import GlobImg from '../../images/icons/glob.svg'
import LocationImg from '../../images/icons/location.svg'
import PersonImg from '../../images/icons/person.svg'
import GenderImg from '../../images/icons/gender.svg'
import StatusImg from '../../images/icons/status.svg'
import PaintImg from '../../images/icons/paint.svg'
import AgeImg from '../../images/icons/age.svg'
import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetUserByIdQuery } from '../../store/services/admin-api/user/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setIsCreatedUserViewed } from '../../store/services/admin-api/user/user.slice';
import useManageProfile from '../../customHooks/useManageProfile';
import DeleteIcon from '../../images/icons/delete.svg'


function UserInfo() {

    const params = useParams()
    const [lookingFor, setLookingFor] = useState<string[]>([])
    const addedUser = useSelector(selectAddedUserData)
    const { data } = useGetUserByIdQuery({ userId: params.id ? +params.id : 1 })
    const [isEditTurnOn, setIsEditTurnOn] = useState(false)
    const dispatch = useDispatch()

    const [items, setItems] = useState<{
        icon: string, header: string, options?: { value: string; label: string; }[], selectedOption: { value: string; label: string; } | string | number, selectOption?: React.Dispatch<React.SetStateAction<{
            value: string;
            label: string;
        } | string | number>>
    }[]>([])



    useEffect(() => {
        if (data) {
            setSelectedCity({ label: data.user.city, value: '0' })
        }

    }, [data, isEditTurnOn])

    useEffect(() => {
        if (data) {
            setSelectedCountry({ label: data.user.country, value: '0' })
        }

    }, [data, isEditTurnOn])
    useEffect(() => {

        if (data) {
            setSelectedGender({ label: data.user.gender, value: '0' })
        }

    }, [data, isEditTurnOn])

    const { cities, countries, email, genders, age, profileDescription, setSelectedCountry, setProfileDescription, selectedGender, setEmail, selectedCity, selectedCountry, setSelectedGender, setAge, setSelectedCity } = useManageProfile()


    useEffect(() => {
        setItems(
            [{ icon: MailImg, header: 'Email', selectedOption: email, selectOption: setEmail, },
            { icon: GlobImg, header: 'Country', options: countries, selectedOption: selectedCountry, selectOption: setSelectedCountry, },
            { icon: LocationImg, header: 'City', options: cities, selectedOption: selectedCity, selectOption: setSelectedCity, },
            { icon: AgeImg, header: 'Age', selectedOption: age?.toString(), selectOption: setAge },
            { icon: GenderImg, header: 'Gender', options: genders, selectedOption: selectedGender, selectOption: setSelectedGender, },
            { icon: StatusImg, header: 'Status', selectedOption: 'status', selectOption: () => { }, },
            { icon: PersonImg, header: 'About me', selectedOption: profileDescription, selectOption: setProfileDescription },
            { icon: PaintImg, header: "I'm looking for", selectedOption: lookingFor.join(', '), selectOption: () => { } }
            ]

        )
    }, [age, isEditTurnOn, cities, countries, data, email, genders, lookingFor, profileDescription, selectedCity, selectedCountry, selectedGender, setAge, setEmail, setProfileDescription, setSelectedCity, setSelectedCountry, setSelectedGender])



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

        setAge(data?.user.age)
        setProfileDescription(data?.user.profileDescription)
        setEmail(data?.user.email)



    }, [data, isEditTurnOn])

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
        setIsEditTurnOn(false)
    }


    return (
        <AdminLayout isBackButtonVisible={true} headerRight={


            <>
                {isEditTurnOn ? <SectionHeaderButton icon={DeleteIcon} text={'CANCEL'} clickButton={() => { onCancelChanges() }} background={'#EE3143'} color={'#fffff'} /> : <></>}

                {isEditTurnOn ? <SectionHeaderButton icon={EditIcon} text={'SAVE CHANGES'} clickButton={onSaveChanges} background={'#0077EB'} color={'#ffff'} /> : <SectionHeaderButton icon={EditIcon} text={'EDIT PROFILE'} clickButton={() => { setIsEditTurnOn(true) }} background={'#0077EB'} color={'#ffff'} />}

            </>

        } navigationItems={['All clients', data?.user.name || 'Name']} pageHeader='User profile'  >
            {data ? <div className={styles.user_info}>

                <UserProfileInfoCard imgId={data ? data.user.userPhotos[0].id : []} plan={data.user.plan} avatar={logo} name={data.user.name} role={data.user.role} />
                <UserInfoList items={items} isEdit={isEditTurnOn} />
            </div> : <>User not found</>}

        </AdminLayout>




    )
}

export default UserInfo;
