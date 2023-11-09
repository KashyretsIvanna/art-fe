import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './PaymentInfo.module.scss'
import TableList from '../../components/lists/TableList/TableList'

import visaIcon from '../../images/icons/visa.png'
import SectionLine from '../../components/lines/SectionLine/SectionLine';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PaymentByIdData, useGetPaymentByIdQuery } from '../../store/services/admin-api/payments/paymentsApi';



export default function PaymentInfo() {

    const { id } = useParams()

    const [payouts, setPayouts] = useState<PaymentByIdData>()
    const { data } = useGetPaymentByIdQuery({ payoutId: id })


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



    return (
        <AdminLayout isBackButtonVisible={true} navigationItems={['List of payments']} pageHeader='Payment' headerRight={<>
        </>}>

            {`US$ `+ payouts?.amount.toFixed(2) + `    ${payouts?.currency.toUpperCase()}`}
            <div className={styles.user_list__container}>
                {payouts ? <TableList isCheckbox={false} columns={columns}
                    data={[{ id: payouts.id, data: ['', formatDate(new Date(payouts.created)), payouts?.customer?.name, <><img src={visaIcon} />{payouts.payment_method.object}</>, payouts?.customer?.email] }]} /> : <></>}

                <div className={styles.payment_details}>
                    <SectionLine />
                    <h3>Payment details</h3>
                    <SectionLine />
                    <div className={styles.payment_details__info}>
                        <div>
                            <div>Statue</div>
                            <div>{payouts?.status}</div>
                        </div>
                        <div>
                            <div>Description</div>
                            <div>{payouts?.description}</div>
                        </div>

                    </div>
                </div>

            </div>


        </AdminLayout>
    )
}


