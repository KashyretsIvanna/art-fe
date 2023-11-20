
import PremiumItem from '../../text/Premium/Premium';
import styles from './UserProfileInfoCard.module.scss'
import PhotoPicker from '../../photo-display/PhotoPicker/PhotoPicker';
import ReusableButton from '../../buttons/ReusableButton/ReusableButton';
import { useEffect, useState } from 'react';
import { useChangePhotosOrderMutation } from '../../../store/services/api/profile/profile.api';
import GivePremiumModal from '../../modals/GivePremiumModal/GivePremiumModal';

function UserProfileInfoCard({ name, userId, role, plan, imgIds, isGivePremiumOpen, setIsGivePremiumOpen }: { setIsGivePremiumOpen: React.Dispatch<React.SetStateAction<boolean>>, userId: number, isGivePremiumOpen: boolean, name: string, role: string, plan?: string, imgIds: { id: number, order: number }[] }) {
    const [currentPosition, setCurrentPosition] = useState(0)
    const [changeOrderMutation, { data, error }] = useChangePhotosOrderMutation()

    const setMainImg = () => {
        const imgIdToSetMain = imgIds[currentPosition]
        const newArray = imgIds.filter(el => el.id !== imgIdToSetMain.id)
        const resultArray = [imgIdToSetMain.id, ...newArray.map(el => el.id)]
        changeOrderMutation(resultArray)
    }
    useEffect(() => {
        console.log(error)
    }, [error])


    useEffect(() => {
        if (data !== undefined) {
            setCurrentPosition(0)
        }
    }, [data])


    return (
        <div className={styles.profile_card}>
            <PhotoPicker currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} imagesIds={imgIds} />
            {plan !== 'STANDARD' && <PremiumItem />}
            <p className={styles.profile_card__name}>{name}</p>
            <p className={styles.profile_card__role}>{role}</p>
            <div className={styles.profile_card__set_main}>
                {imgIds[currentPosition].order !== 1 ? <ReusableButton text={'Set as main image'} clickButton={function (): void {
                    setMainImg()
                }} /> : <></>}
            </div>
            {isGivePremiumOpen && <GivePremiumModal userId={userId} onClose={() => { setIsGivePremiumOpen(false) }} name={name} role={role} imgIds={imgIds} />}

        </div>
    )
}

export default UserProfileInfoCard;

