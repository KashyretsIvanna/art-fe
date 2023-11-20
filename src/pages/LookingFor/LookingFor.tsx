import LookingForCheckbox from '../../components/inputs/CheckboxLookFor/CheckboxLookFor';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import styles from './LookingFor.module.scss'
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import configJson from '../../../plan-config.json'
import { useGetNewProfileInfoQuery, useSetLookingForMutation } from '../../store/services/api/profile/profile.api';
import { logoutNewUser, setLookingFor } from '../../store/services/admin-api/user/user.slice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UseManageStepsNAvigation from '../../customHooks/useManageStepsNavigation';
import { ProfileCreationSteps, setCurrentStep } from '../../store/services/application/location/location.slice';

const LookingFor = () => {
    const [checkedArtist, setCheckedArtist] = useState(false);
    const [checkedGallery, setCheckedGallery] = useState(false);
    const [checkedCollector, setCheckedCollector] = useState(false);
    const [allowedRolesToLook, setAllowedRolesToLook] = useState<string[]>([])
    const [postLookingFor, { data: lookingForRes }] = useSetLookingForMutation()
    const { data, isLoading, error } = useGetNewProfileInfoQuery();
    const dispatch = useDispatch()

    UseManageStepsNAvigation()

    useEffect(() => {
        if (data?.role === 'ARTIST') {
            setAllowedRolesToLook(configJson.standard.artist.availableLookFor)
        }

        if (data?.role === 'GALLERY') {
            setAllowedRolesToLook(configJson.standard.gallery.availableLookFor)
        }

        if (data?.role === 'COLLECTOR') {
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
            dispatch(logoutNewUser())
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOGIN }))
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
        if (checkedCollector && !checkedGallery && !checkedArtist) {
            postLookingFor({
                preferences: { isLookingForCollector: true },
                filters: {}
            })
        }
        
        dispatch(setLookingFor({ roles: lookForRoles }))

        if (checkedGallery && checkedArtist) {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR_GALLERY_ARTIST }))
        } else if (checkedGallery) {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR_GALLERY }))
        } else {
            dispatch(setCurrentStep({ currentStep: ProfileCreationSteps.LOOK_FOR_ARTIST }))
        }

    }


    return (
        <AdminLayout isBackButtonVisible={true} headerRight={
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
            }} stepNumber={5} totalAmountSteps={6} />

        </AdminLayout >

    );
};

export default LookingFor;
