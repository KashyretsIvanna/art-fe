import styles from './RefundInfoModal.module.scss'
import InfoIcon from '../../../images/icons/info.svg'
import ReusableButton from '../../buttons/ReusableButton/ReusableButton';
import { useEffect, useState } from 'react';
function RefundInfoModal({ currency, amount, onCancelClick, onRefundClick }: { currency: string, amount: number, onCancelClick: () => void, onRefundClick: (amount: number) => void }) {


    const [refundAmount, setRefundAmount] = useState(amount)
    useEffect(() => {

        if (refundAmount > amount) { setRefundAmount(amount) }
    }, [refundAmount])

    return (
        <div className={styles.refund_container}>
            <div className={styles.refund_header}>Refund payment</div>
            <div className={styles.refund_info}>
                <img src={InfoIcon} alt='info' />
                <div> Refunds take 5-10 days to appear on a customer’s
                    statement. Stripe’s fees for the original payment won’t be
                    returned, but there are no additional fees for the refund.
                    <br />
                    <a href='#'>Learn more.</a></div>
            </div>
            <div className={styles.refund_body}>
                <label>Refund</label> <div><input value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} max={amount} type='number' /><span>{currency.toUpperCase()}</span></div>
            </div>
            <div className={styles.refund_footer}>
                <div className={styles.refund__button_container}>
                    <ReusableButton color='#575757' text={'Cancel'} clickButton={function (): void {
                        onCancelClick()
                    }} />
                </div>
                <div className={styles.refund__button_container}>

                    <ReusableButton color='#399CFF' text={'Refund'} clickButton={function (): void {
                        onRefundClick(refundAmount)
                    }} />
                </div>
            </div>

        </div>

    )
}

export default RefundInfoModal;

