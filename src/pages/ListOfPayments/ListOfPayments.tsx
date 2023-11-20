import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './ListOfPayments.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import usePagination from '@mui/material/usePagination';
import { useEffect, useState } from 'react';
import CustomizedTabs from '../../components/buttons/PageCheckout/PageCheckout';
import visaIcon from '../../images/icons/visa.png'
import { PaymentListRes, useGetPaymentsQuery } from '../../store/services/admin-api/payments/paymentsApi';
import UnknownAmountPag from '../../components/pagination/UnknownAmountPagination/UnknownAmountPagination';
import StatusDesign from '../../components/badges/StatusDesign/StatusDesign';


function ListOfPayments() {
    const [page, setPage] = useState<number>(1)
    const [pagePayouts, setPagePayouts] = useState<number>(1)
    const [payoutsLoading, setPAyoutsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState<number>(1)

    const [payouts, setPayouts] = useState<PaymentListRes>()
    const [startAfter, setStartAfter] = useState<string[] | undefined>()
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const [selectedPayments, setSelectedPayments] = useState<number[]>([])
    const { data } = useGetPaymentsQuery({ limit: 10, startAfter: startAfter && startAfter.length ? startAfter[startAfter?.length - 1] : undefined })


    const { items } = usePagination({
        count: totalPages,
        defaultPage: 1
    });

    useEffect(() => {
        if (data) {
            const res = data.data.map(el => {
                const firstLetter = el.status.charAt(0)

                const firstLetterCap = firstLetter.toUpperCase()

                const remainingLetters = el.status.slice(1)

                return { ...el, status: firstLetterCap + remainingLetters }
            })

            setPayouts({ data: res })
            setPAyoutsLoading(false)


        }
    }, [data])

    useEffect(() => { console.log(payoutsLoading) }, [payoutsLoading])
    useEffect(() => {
        const pageSelected = items.filter(el => el.selected === true)[0]
        if (pageSelected.page) {
            setPage(pageSelected.page)

        }
    }, [items])

    useEffect(() => {
        setTotalPages(1)
    }, [])

    const [tab, setTab] = useState(0)

    function formatDate(date: Date) {


        const formattedDate = date.toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',

        });
        return formattedDate;
    }

    const columns = ["Name", "Email", "Default payment method", "Created"]
    const payoutsColumns = ["Amount", "", "", "Customer", "Date", " "]

    const onNextClick = () => {
        setPagePayouts(prev => prev + 1)
        if (data) {
            setStartAfter(prev => prev ? [...prev, data.data[data.data.length - 1].id] : [data.data[data.data.length - 1].id])
        }
        setPAyoutsLoading(true)
    }

    const onPrevClick = () => {
        setPagePayouts(prev => prev - 1)
        if (data) {
            setStartAfter(prev => {

                const lastId = prev ? prev[prev.length - 1] : undefined
                return prev ? prev.filter(el => el !== lastId) : []
            })
        }

        setPAyoutsLoading(true)
    }


    return (
        <AdminLayout isBackButtonVisible={true} navigationItems={['List of payments']} pageHeader='Payments' headerRight={<>
        </>}>
            <CustomizedTabs tabNames={['Customers', 'Payments']} setTab={setTab} active={tab} />

            <div className={styles.user_list__container}>
                {tab === 0 ? <><TableList isCheckbox={true} columns={columns}
                    setSelected={setSelectedUsers} selected={selectedUsers} data={payouts ? payouts.data.map(el => ({ id: el.id, data: [el.customer.name, el.customer.email, <><img src={visaIcon} />****{el && el.latest_charge ? el.latest_charge.payment_method_details.card.last4 : ''}</>, formatDate(new Date(el.created * 1000))] })) : []} />
                    <UnknownAmountPag onNextClick={onNextClick} onPrevClick={onPrevClick} isNext={payoutsLoading ? false : data ? data.has_more : false} isPrev={payoutsLoading ? false : pagePayouts === 1 ? false : true} />
                </>
                    :
                    <><TableList isCheckbox={true} columns={payoutsColumns}
                        setSelected={setSelectedPayments} selected={selectedPayments} data={payouts ? payouts.data.map(el => ({
                            id: el.id, data: [(el.amount/100).toFixed(2), el.currency.toUpperCase(), <StatusDesign text={el.status} />, el.customer.email, formatDate(new Date(el.created*1000))]
                        })) : []} />
                        <UnknownAmountPag onNextClick={onNextClick} onPrevClick={onPrevClick} isNext={payoutsLoading ? false : data ? data.has_more : false} isPrev={payoutsLoading ? false : pagePayouts === 1 ? false : true} />
                    </>
                }
            </div>

        </AdminLayout>
    )
}

export default ListOfPayments;
