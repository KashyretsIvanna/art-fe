import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './ListOfPayments.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import UsePagination from '../../components/pagination/ListPagination/ListPagination';
import usePagination from '@mui/material/usePagination';
import { useEffect, useState } from 'react';
import CustomizedTabs from '../../components/buttons/PageCheckout/PageCheckout';
import visaIcon from '../../images/icons/visa.png'


const paymentsData = [{ name: "Anjekjsjf ddds", email: "emaul@gmail.vcom", method: "****6574", created: new Date().toISOString() },
{ name: "Anjekjsjf ddds", email: "emaul@gmail.vcom", method: "****6574", created: new Date().toISOString() },
{ name: "Anjekjsjf ddds", email: "emaul@gmail.vcom", method: "****6574", created: new Date().toISOString() },
{ name: "Anjekjsjf ddds", email: "emaul@gmail.vcom", method: "****6574", created: new Date().toISOString() },
{ name: "Anjekjsjf ddds", email: "emaul@gmail.vcom", method: "****6574", created: new Date().toISOString() }]

function ListOfPayments() {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [admins, setAdmins] = useState<{
        name: string;
        email: string;
        method: string;
        created: string;
    }[]>(paymentsData)
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])

    const { items } = usePagination({
        count: totalPages,
        defaultPage: 1
    });


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

    return (
        <AdminLayout isBackButtonVisible={true} navigationItems={['List of payments']} pageHeader='Customers' headerRight={<>
        </>}>
        <CustomizedTabs tabNames={['Overview', 'Remaining balances to payments']} setTab={setTab} active={tab} />

            <div className={styles.user_list__container}>
                <TableList columns={columns}
                    setSelected={setSelectedUsers} selected={selectedUsers} data={admins.map(el => ({ id: el.id, data: [el.name, el.email, <><img src={visaIcon} />{el.method}</>, formatDate(new Date(el.created))] }))} />
                <UsePagination items={items} />
            </div>

        </AdminLayout>
    )
}

export default ListOfPayments;
