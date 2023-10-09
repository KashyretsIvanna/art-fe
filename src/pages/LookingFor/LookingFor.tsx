import * as React from 'react';
import LookingForCheckbox from '../../components/inputs/CheckboxLookFor/CheckboxLookFor';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import styles from './LookingFor.module.scss'
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
const LookingFor = () => {
    const [checkedArtist, setCheckedArtist] = React.useState(false);
    const [checkedGallery, setCheckedGallery] = React.useState(false);
    const [checkedCollector, setCheckedCollector] = React.useState(false);


    const handleChangeArtist = () => {
        setCheckedArtist(prev => !prev);
    };

    const handleChangeGallery = () => {
        setCheckedGallery(prev => !prev);
    };

    const handleChangeCollector = () => {
        setCheckedCollector(prev => !prev);
    };
    const clickButton = async () => {

        //write looking for in state

    }

    return (
        <AdminLayout headerRight={
            <></>} navigationItems={['All Clients', 'Name of Client']} pageHeader='Menu' >
            <div className={styles.looking__container}>
                <p className={styles.looking__header}>I’m Looking for:</p>
                <LookingForCheckbox
                    label="Artist"
                    onChange={handleChangeArtist} error={''} />
                <LookingForCheckbox
                    label="Gallery"
                    onChange={handleChangeGallery} error={''} />
                <LookingForCheckbox
                    label="Art Dealer"
                    onChange={handleChangeCollector} error={''} />



            </div>
            <NavigationSteps onContinue={() => {
                clickButton()
            }} stepNumber={1} totalAmountSteps={4} />

        </AdminLayout >

    );
};

export default LookingFor;
