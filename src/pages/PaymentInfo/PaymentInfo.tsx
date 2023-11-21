import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './PaymentInfo.module.scss'
import TableList from '../../components/lists/TableList/TableList'

import visaIcon from '../../images/icons/visa.png'
import SectionLine from '../../components/lines/SectionLine/SectionLine';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PaymentByIdData, useGetPaymentByIdQuery, useRefundPaymentByIdMutation } from '../../store/services/admin-api/payments/paymentsApi';
import StatusDesign from '../../components/badges/StatusDesign/StatusDesign';
import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';

import RefundIcon from '../../images/icons/refund.svg'
import ModalLayout from '../../components/modals/ModalLaout/ModalLaout';
import RefundInfoModal from '../../components/info-cards/RefundInfoModal/RefundInfoModal';

export default function PaymentInfo() {

    const { id } = useParams()

    const { state } = useLocation()

    const [payouts, setPayouts] = useState<PaymentByIdData>()
    const { data } = useGetPaymentByIdQuery({ payoutId: id })
    const [refundPayment, { data: refundData }] = useRefundPaymentByIdMutation()
    const [isRefundOpen, setOsRefundOpen] = useState(false)
    useEffect(() => {
        if (refundData) {
            setOsRefundOpen(false)
        }
    }, [refundData])

    useEffect(() => {
        if (data) {
            const firstLetter = data.status.charAt(0)

            const firstLetterCap = firstLetter.toUpperCase()

            const remainingLetters = data.status.slice(1)



            setPayouts({ ...data, status: firstLetterCap + remainingLetters })


        }
    }, [data])
    function formatDate(date: Date) {


        const formattedDate = date.toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',

        });
        return formattedDate;
    }


    const columns = ["Last update", "Customer", "Payment method", "Email",]
    const navigate = useNavigate()
    return (
        <AdminLayout onBackButtonClick={() => {
            navigate('/payments', { state: state })

        }} isBackButtonVisible={true} navigationItems={['List of payments']} pageHeader='Payment' headerRight={<>
        </>}>

            <div className={styles.payment_details__header}>          <div><span className={styles.payment_details__amount}>{`US$ ` + (payouts?.amount / 100).toFixed(2)}</span><div className={styles.payment_details__currency}>{payouts?.currency.toUpperCase()}</div><div className={styles.payment_details__status}> <StatusDesign text={payouts ? payouts.status : ''} /></div></div>             {payouts && payouts.amount / 100 - payouts.latest_charge.amount_refunded / 100 > 0 ? <SectionHeaderButton icon={RefundIcon} text={'Refund'} clickButton={() => { setOsRefundOpen(true) }} background={'#399CFF'} color={'#fffff'} /> : <></>}

            </div>
            <div className={styles.user_list__container}>
                {payouts ? <TableList isCheckbox={false} columns={columns}
                    data={[{ id: payouts.id, data: ['', formatDate(new Date(payouts.created * 1000)), payouts?.customer?.name, <><img src={visaIcon} />****{payouts.payment_method.card.last4}</>, payouts?.customer?.email] }]} /> : <></>}

                <div className={styles.payment_details}>
                    <SectionLine />
                    <h3>Payment details</h3>
                    <SectionLine />
                    <table className={styles.payment_details__info}>
                        <tbody>
                            <tr>
                                <td className={styles.payment_details__key}>Statue</td>
                                <td className={styles.payment_details__value}>{payouts?.status}</td>
                            </tr>
                            <tr>
                                <td className={styles.payment_details__key}>Description</td>
                                <td className={styles.payment_details__value}>{payouts?.description}</td>
                            </tr>
                        </tbody>


                    </table>
                </div>

            </div>
            {isRefundOpen && <ModalLayout modal={<RefundInfoModal currency={payouts ? payouts.currency : ''} amount={payouts ? payouts.amount / 100 - payouts.latest_charge.amount_refunded / 100 : 0} onCancelClick={function (): void {
                setOsRefundOpen(false)
            }} onRefundClick={function (amount: number): void {
                if (id) {
                    refundPayment({ amount: (amount * 100).toFixed(0), payoutId: id })
                } else {
                    console.log('no id found')
                }
            }} />} closeModal={function (): void {
                setOsRefundOpen(false)
            }} />
            }

        </AdminLayout >
    )
}


