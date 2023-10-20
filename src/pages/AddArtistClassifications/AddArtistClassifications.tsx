import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddArtistClassifications.module.scss'
import { useEffect } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery } from '../../store/services/api/classifications/classifications.api';
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';

function AddArtistClassifications() {
    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'ARTIST' })

    const { setClassifications, classifications, selectedClassifications, setSelectedClassifications } = useManageProfile()
    const { setErrorClassification, classificationsError } = useManageFormErrors()



    useEffect(() => {
        if (galleryClassifications) {
            setClassifications(galleryClassifications.map((el: { id: number; classificationName: string; }) => ({
                value: el.id.toString(),
                label: el.classificationName
            })))
        }
    }, [galleryClassifications, setClassifications])



    const clickButton = () => {
        console.log('data sent')

    }
    useEffect(() => {
        if (!((selectedClassifications.length === 0 || selectedClassifications.length > 5))) {

            if (selectedClassifications.length === 0 || selectedClassifications.length > 5) {
                setErrorClassification('Choose classifications')
            } else {
                setErrorClassification('')
            }


        }



    }, [selectedClassifications.length])

    return (
        <AdminLayout headerRight={
            null} navigationItems={['Artist', 'User name']} pageHeader='Artist'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>
            </div>

            <NavigationSteps disabled={!(!classificationsError && classificationsError !== null)} onContinue={clickButton} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddArtistClassifications;
