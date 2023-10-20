import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AddGalleryClassifications.module.scss'
import { useEffect } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect/MultiSelect';
import NavigationSteps from '../../components/navigation/StepsNavigation/StepsNavigation';
import { useGetClassificationsQuery, useGetGalleryTypesQuery, useGetOrientationsQuery } from '../../store/services/api/classifications/classifications.api';
import useManageProfile from '../../customHooks/useManageProfile';
import useManageFormErrors from '../../customHooks/useManageFormErrors';

function AddGalleryClassifications() {
    const { data: galleryClassifications } = useGetClassificationsQuery({ role: 'GALLERY' })
    const { data: artOrientations } = useGetOrientationsQuery()
    const { data: galleryTypes } = useGetGalleryTypesQuery()
    const { setGalleryTypes, setClassifications, selectedOrientations, selectedGalleryTypes, setSelectedGalleryTypes, setOrientations, setSelectedOrientations, classifications, orientations, selectedClassifications, setSelectedClassifications, types } = useManageProfile()
    const { typesError, orientationsError, setErrorClassification, setOrientationsError, setTypesError, classificationsError } = useManageFormErrors()



    useEffect(() => {
        if (galleryClassifications) {
            setClassifications(galleryClassifications.map((el: { id: number; classificationName: string; }) => ({
                value: el.id.toString(),
                label: el.classificationName
            })))
        }
    }, [galleryClassifications, setClassifications])
    useEffect(() => {
        if (galleryTypes) {
            setGalleryTypes(galleryTypes.map((el: { id: number; typeName: string; }) => ({
                value: el.id.toString(),
                label: el.typeName
            })))
        }
    }, [galleryTypes])
    useEffect(() => {
        if (artOrientations) {
            setOrientations(artOrientations.map((el: { id: number; orientationName: string; }) => ({
                value: el.id.toString(),
                label: el.orientationName
            })))
        }
    }, [artOrientations])


    const clickButton = () => {
        console.log('data sent')

    }
    useEffect(() => {
        if (!((selectedClassifications.length === 0 || selectedClassifications.length > 5 && (selectedOrientations.length === 0 || selectedOrientations.length > 5) && (selectedGalleryTypes.length === 0 || selectedGalleryTypes.length > 5)))) {

            if (selectedClassifications.length === 0 || selectedClassifications.length > 5) {
                setErrorClassification('Choose classifications')
            } else {
                setErrorClassification('')
            }
            if (selectedOrientations.length === 0 || selectedOrientations.length > 5) {
                setOrientationsError('Choose orientations')
            } else {
                setOrientationsError('')
            }
            if (selectedGalleryTypes.length === 0 || selectedGalleryTypes.length > 5) {
                setTypesError('Choose types')
            } else {
                setTypesError('')
            }

        }



    }, [selectedClassifications.length, selectedGalleryTypes.length, selectedOrientations.length])

    return (
        <AdminLayout headerRight={
            null} navigationItems={['Gallery', 'User name']} pageHeader='Gallery'>
            <div className={styles.inputs_container}>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect options={types} selectedOption={selectedGalleryTypes} setSelectedOption={setSelectedGalleryTypes} label={'Gallery type'} error={typesError} />
                    </div>
                </div>

                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={classificationsError} options={classifications} selectedOption={selectedClassifications} setSelectedOption={setSelectedClassifications} label={'Art Classification type'} />
                    </div>
                </div>
                <div className={styles.input_col_container}>

                    <div className={styles.input_row_container}>
                        <MultiSelect error={orientationsError} options={orientations} selectedOption={selectedOrientations} setSelectedOption={setSelectedOrientations} label={'Art Orientations'} />
                    </div>
                </div>

            </div>

            <NavigationSteps disabled={!(!classificationsError && !orientationsError && !typesError && classificationsError !== null && orientationsError !== null && typesError !== null)} onContinue={clickButton} stepNumber={3} totalAmountSteps={4} />
        </AdminLayout>




    )
}

export default AddGalleryClassifications;
