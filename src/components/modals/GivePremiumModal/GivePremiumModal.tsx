import { useEffect, useState } from "react";

import PhotoPicker from "../../photo-display/PhotoPicker/PhotoPicker";
import ModalLayout from "../ModalLaout/ModalLaout";
import styles from './GivePremiumModal.module.scss'
import GivePremiumButton from "../../buttons/GivePremiumBytton/GivePremiumBytton";
import NumberInputPremium from "../../inputs/NumberInputPremium/NumberInputPremium";
import crossIcon from '../../../images/icons/cross.svg'
import { useGiveSubscriptionMutation } from "../../../store/services/admin-api/subscriptions/subscriptionApi";
const GivePremiumModal = ({ name, imgIds, onClose, userId }: { userId: number, onClose: () => void, name: string, imgIds: { id: number, order: number }[] }) => {
    const [currentPosition, setCurrentPosition] = useState(0)
    const [amountDays, setAmountDays] = useState()
    const [amountDaysError, setAmountDaysError] = useState('')

    const [giveSubscription, { data }] = useGiveSubscriptionMutation()
    useEffect(() => {
        if (data) {
            onClose()
        }
    }, [data])

    const onGivePremiumClick = async () => {
        if (Number(amountDays) && Number(amountDays) >= 1) {
            await giveSubscription({ amountDays: Number(amountDays), userId })
            setAmountDaysError('')
            onClose()
        } else {
            setAmountDaysError('Provide integer amount')

        }
    }
    return (
        <ModalLayout closeModal={function (): void {
            throw new Error("Function not implemented.");
        }} modal={<div className={styles.profile_card}>
            <img onClick={onClose} className={styles.profile_card__close} src={crossIcon} />
            <PhotoPicker isPremiumVisible={false} isStatusVisible={false} currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} imagesIds={[imgIds[0]]} />
            <p className={styles.profile_card__name}>{name}</p>
            <div className={styles.profile_card__input}><NumberInputPremium label={"Count of days"} max={0} error={amountDaysError} min={1} data={amountDays} setData={(e) => { setAmountDays(e) }} placeholder={""} /></div>
            <GivePremiumButton text={"GIVE premium"} clickButton={() => { onGivePremiumClick() }} />


        </div>}></ModalLayout>

    )
}

export default GivePremiumModal;
