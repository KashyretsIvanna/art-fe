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
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedUserData, setIsCreatedUserViewed } from '../../store/services/admin-api/user/user.slice';
import useManageProfile from '../../customHooks/useManageProfile';
import DeleteIcon from '../../images/icons/delete.svg'
import { useGetUserByIdQuery, useUpdateUserByIdMutation, useUpdateUserProfileByIdMutation } from '../../store/services/api/profile/profile.api';

function UserInfo() {
    const params = useParams()
    const [lookingFor, setLookingFor] = useState<string[]>([])
    const addedUser = useSelector(selectAddedUserData)
    const { data, isLoading } = useGetUserByIdQuery({ userId: params.id ? +params.id : 1 })
    const [isEditTurnOn, setIsEditTurnOn] = useState(false)
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [updateUserById, { status: updatedUserData, isLoading: updatedUserDataLoading, ...updateUserError }] = useUpdateUserByIdMutation()
    const [updateUserProfileById, { status: updatedUserProfileData, isLoading: updatedUserProfileDataLoading, ...updateProfileError }] = useUpdateUserProfileByIdMutation()
    const [isUserPremium, setIsUserPremium] = useState(false)
    const [items, setItems] = useState<{
        icon: string, header: string, options?: { value: string; label: string; }[], selectedOption: { value: string; label: string; } | string | number, selectOption?: React.Dispatch<React.SetStateAction<{
            value: string;
            label: string;
        } | string | number>>, isEditable: boolean
    }[]>([])

    const { cities, countries, email, genders, age, profileDescription, setSelectedCountry, setProfileDescription, selectedGender, setEmail, selectedCity, selectedCountry, setSelectedGender, setAge, setSelectedCity } = useManageProfile()
    useEffect(() => {
        if (data) {
            setIsUserPremium(data.user.plan)
        }
    }, [data])


    const resetAllData = () => {
        if (data) {
            setSelectedCity({ label: data.user.city, value: '0' })
            setSelectedCountry({ label: data.user.country, value: '0' })
            setSelectedGender({ label: data.user.gender, value: '0' })
            setItems(
                [{ icon: MailImg, header: 'Email', selectedOption: email, selectOption: setEmail, isEditable: true },
                { icon: GlobImg, header: 'Country', options: countries, selectedOption: selectedCountry, selectOption: setSelectedCountry, isEditable: true },
                { icon: LocationImg, header: 'City', options: cities, selectedOption: selectedCity, selectOption: setSelectedCity, isEditable: true },
                { icon: AgeImg, header: 'Age', selectedOption: age?.toString(), selectOption: setAge, isEditable: true },
                { icon: GenderImg, header: 'Gender', options: genders, selectedOption: selectedGender, selectOption: setSelectedGender, isEditable: true },
                { icon: StatusImg, header: 'Status', selectedOption: { value: '0', label: isUserPremium }, selectOption: () => { }, isEditable: false },
                { icon: PersonImg, header: 'About me', selectedOption: profileDescription, selectOption: setProfileDescription, isEditable: true },
                { icon: PaintImg, header: "I'm looking for", selectedOption: lookingFor.join(', '), selectOption: () => { }, isEditable: false }
                ]
            )
            setAge(data?.user.age)
            setProfileDescription(data?.user.profileDescription)
            setEmail(data?.user.email)
        }
    }

    useEffect(() => {
        if (data) {
            setSelectedCity({ label: data.user.city, value: '0' })
        }

    }, [data, setSelectedCity])

    useEffect(() => {
        if (data) {
            setSelectedCountry({ label: data.user.country, value: '0' })
        }

    }, [data, setSelectedCountry])

    useEffect(() => {

        if (data) {
            setSelectedGender({ label: data.user.gender, value: '0' })
        }

    }, [data, setSelectedGender])

    useEffect(() => {
        setItems(
            [{ icon: MailImg, header: 'Email', selectedOption: email, selectOption: setEmail, isEditable: true },
            { icon: GlobImg, header: 'Country', options: countries, selectedOption: selectedCountry, selectOption: setSelectedCountry, isEditable: true },
            { icon: LocationImg, header: 'City', options: cities, selectedOption: selectedCity, selectOption: setSelectedCity, isEditable: true },
            { icon: AgeImg, header: 'Age', selectedOption: age?.toString(), selectOption: setAge, isEditable: true },
            { icon: GenderImg, header: 'Gender', options: genders, selectedOption: selectedGender, selectOption: setSelectedGender, isEditable: true },
            { icon: StatusImg, header: 'Status', selectedOption: { value: '0', label: isUserPremium }, selectOption: () => { }, isEditable: false },
            { icon: PersonImg, header: 'About me', selectedOption: profileDescription, selectOption: setProfileDescription, isEditable: true },
            { icon: PaintImg, header: "I'm looking for", selectedOption: lookingFor.join(', '), selectOption: () => { }, isEditable: false }
            ]

        )
    }, [age, cities, countries, data, email, genders, lookingFor, isUserPremium, profileDescription, selectedCity, selectedCountry, selectedGender, setAge, setEmail, setProfileDescription, setSelectedCity, setSelectedCountry, setSelectedGender])

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
    }, [data, setAge, setEmail, setProfileDescription])

    useEffect(() => {
        if (email && !email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        )) {
            setError('Provide an email')
        } else if (age && age < 18) {
            setError('Age must not be less than 18')
        } else {
            setError('')
        }

    }, [email, age])

    useEffect(() => {
        if (addedUser.createdUserId === Number(params.id)
        ) {
            dispatch(setIsCreatedUserViewed({
                isViewed: true
            }))
        }
    }, [addedUser.createdUserId, dispatch, params.id])

    const onSaveChanges = async () => {
        if (!error) {
            if (data && (age !== data.user.age || selectedGender.label !== data.user.gender || profileDescription !== data.user.profileDescription)) {
                await updateUserProfileById({
                    age: age !== data.user.age ? Number(age) : undefined,
                    gender: selectedGender.label !== data.user.gender ? selectedGender.label.toUpperCase().split(' ').join('_') : undefined,
                    profileDescription: profileDescription !== data.user.profileDescription ? profileDescription : undefined,
                    userId: data.user.id,
                })

            }

            if (data && (email !== data.user.email || selectedCountry.label !== data.user.country || selectedCity.label !== data.user.city)) {

                await updateUserById({
                    email: email !== data.user.email ? email : undefined, userId: data.user.id, discovery: selectedCity.label !== data.user.city && selectedCountry.label !== data.user.country ? {
                        location: {
                            lat: selectedCity.label !== data.user.city && selectedCountry.label !== data.user.country ? Number(selectedCity.lat) : undefined,
                            lng: selectedCity.label !== data.user.city && selectedCountry.label !== data.user.country ? Number(selectedCity.lng) : undefined,
                            isLocationAuto: true
                        }
                    } : undefined
                })
            }

        }
    }
    useEffect(() => {
        if (((updatedUserData === 'fulfilled' || updatedUserProfileData === 'fulfilled') && !updatedUserDataLoading && !updatedUserProfileDataLoading && !isLoading)) {
            setIsEditTurnOn(false)
        }
    }, [updatedUserData, updatedUserProfileData])

    const onCancelChanges = () => {
        setIsEditTurnOn(false)
        resetAllData()
        setError('')
    }
    const [isGivePremiumOpen, setIsGivePremiumOpen] = useState(false)



    const onMakePremium = () => {
        setIsGivePremiumOpen(true)

    }
    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
            <>
                {isEditTurnOn ? <SectionHeaderButton icon={DeleteIcon} text={'CANCEL'} clickButton={() => { onCancelChanges() }} background={'#EE3143'} color={'#fffff'} /> : <></>}
                {!isEditTurnOn && !isGivePremiumOpen && data?.user.plan==='STANDARD' ? <SectionHeaderButton icon={null} text={'MAKE PREMIUM'} clickButton={() => { onMakePremium() }} background={'#0077EB'} color={'#fffff'} /> : <></>}
                {isEditTurnOn ? <SectionHeaderButton icon={EditIcon} text={'SAVE CHANGES'} clickButton={onSaveChanges} background={'#0077EB'} color={'#ffff'} /> : <SectionHeaderButton icon={EditIcon} text={'EDIT PROFILE'} clickButton={() => { setIsEditTurnOn(true) }} background={'#0077EB'} color={'#ffff'} />}
            </>
        } navigationItems={['All clients', data?.user.name || 'Name']} pageHeader='User profile'  >
            {data ? <div className={styles.user_info}>

                <UserProfileInfoCard userId={data.user.id} setIsGivePremiumOpen={setIsGivePremiumOpen} isGivePremiumOpen={isGivePremiumOpen} imgIds={data ? data.user.userPhotos : []} plan={data.user.plan} avatar={logo} name={data.user.name} role={data.user.role} />
                <UserInfoList items={items} isEdit={isEditTurnOn} />
            </div> : <>User not found</>}

            <div style={{ color: 'red' }}>{error}</div>

        </AdminLayout>

    )
}

export default UserInfo;
