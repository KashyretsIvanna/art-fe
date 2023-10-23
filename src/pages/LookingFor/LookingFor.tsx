import LookingForCheckbox from '../../components/inputs/CheckboxLookFor/CheckboxLookFor';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import styles from './LookingFor.module.scss'
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import configJson from '../../../plan-config.json'
import { useGetNewProfileInfoQuery, useSetLookingForMutation } from '../../store/services/api/profile/profile.api';
import { removeNewUserData, setLookingFor } from '../../store/services/admin-api/user/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutNewUser } from '../../store/services/admin-api/auth/auth.slice';
import { useEffect, useState } from 'react';

const LookingFor = () => {
    const [checkedArtist, setCheckedArtist] = useState(false);
    const [checkedGallery, setCheckedGallery] = useState(false);
    const [checkedCollector, setCheckedCollector] = useState(false);
    const [allowedRolesToLook, setAllowedRolesToLook] = useState<string[]>([])
    const [postLookingFor, { data: lookingForRes }] = useSetLookingForMutation()
    const { data, isLoading, error } = useGetNewProfileInfoQuery();
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (data?.role === 'ARTIST') {
            console.log('ARTIST')
            setAllowedRolesToLook(configJson.standard.artist.availableLookFor)
        }

        if (data?.role === 'GALLERY') {
            console.log('GALLERY')

            setAllowedRolesToLook(configJson.standard.gallery.availableLookFor)
        }

        if (data?.role === 'COLLECTOR') {
            console.log('COLLECTOR')

            setAllowedRolesToLook(configJson.standard.collector.availableLookFor)
        }



    }, [data, error, isLoading])


    const handleChangeArtist = () => {
        setCheckedArtist(prev => !prev);
    };

    const handleChangeGallery = () => {
        setCheckedGallery(prev => !prev);
    };

    const handleChangeCollector = () => {
        setCheckedCollector(prev => !prev);

    };

    useEffect(() => {
        if (lookingForRes) {
            dispatch(removeNewUserData())
            dispatch(logoutNewUser())

            navigate('/clients')

        }
    }, [lookingForRes])

    const clickButton = async () => {
        const lookForRoles = []
        if (checkedArtist) {
            lookForRoles.push('ARTIST')
        }
        if (checkedCollector) {
            lookForRoles.push('COLLECTOR')
        }
        if (checkedGallery) {
            lookForRoles.push('GALLERY')
        }
        dispatch(setLookingFor({ roles: lookForRoles }))

        if (checkedGallery) {
            navigate('/clients/gallery/look-for')

            return
        }
        if (checkedArtist) {
            navigate('/clients/artist/look-for')

            return 
        }
        if (checkedCollector) {
            postLookingFor({
                preferences: { isLookingForCollector: true },
                filters: {}
            })
        }

    }


    return (
        <AdminLayout headerRight={
            <></>} navigationItems={['All Clients', 'Name of Client']} pageHeader='Menu' >
            <div className={styles.looking__container}>
                <p className={styles.looking__header}>I’m Looking for:</p>

                {allowedRolesToLook.includes('ARTIST') && <LookingForCheckbox
                    label="Artist"
                    onChange={handleChangeArtist} error={''} />}

                {allowedRolesToLook.includes('GALLERY') && <LookingForCheckbox
                    label="Gallery"
                    onChange={handleChangeGallery} error={''} />}
                {allowedRolesToLook.includes('COLLECTOR') && <LookingForCheckbox
                    label="Art Dealer"
                    onChange={handleChangeCollector} error={''} />}
            </div>
            <NavigationSteps disabled={!checkedArtist && !checkedCollector && !checkedGallery} onContinue={() => {
                clickButton()
            }} stepNumber={1} totalAmountSteps={4} />

        </AdminLayout >

    );
};

export default LookingFor;
