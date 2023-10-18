import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './AdminList.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import UsePagination from '../../components/pagination/ListPagination/ListPagination';
import usePagination from '@mui/material/usePagination';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../images/icons/delete.svg'
import PlusImg from '../../images/icons/plus.svg'
import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';
import { useNavigate } from 'react-router-dom';
import { useDeleteAdminMutation, useGetAdminsQuery } from '../../store/services/admin-api/admins/adminApi';

function AdminList() {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [admins, setAdmins] = useState<{ name: string, email: string, id: number }[]>([])
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const navigate = useNavigate()

    const { items } = usePagination({
        count: totalPages,
        defaultPage: 1
    });

    const [deleteAdmin] = useDeleteAdminMutation()

    useEffect(() => {
        const pageSelected = items.filter(el => el.selected === true)[0]
        if (pageSelected.page) {
            setPage(pageSelected.page)

        }
    }, [items])

    const { data } = useGetAdminsQuery({ page, take: 10 })
    useEffect(() => {
        if (data) {
            setAdmins(data.admins)
            setTotalPages(data?.pages)
        }

    }, [data])

    const onDeleteButtonClick = () => {
        selectedUsers.map(async el => {
            await deleteAdmin({ userId: el })
        })
        setSelectedUsers([])
    }
    const columns = ["Name", "Email", "Password"]




    return (
        <div className={styles.layout}>
            <AdminLayout navigationItems={['Welcome', 'Admin']} pageHeader='Admin' headerRight={<>
                {selectedUsers.length ? <SectionHeaderButton icon={DeleteIcon} text={'DELETE'} clickButton={() => { onDeleteButtonClick() }} background={'#EE3143'} color={'#fffff'} /> : <></>}
                {!selectedUsers.length ? <SectionHeaderButton icon={PlusImg} text={'ADD ADMIN'} clickButton={() => { navigate('/admins/registration') }} background={'#FF9700'} color={'#ffff'} /> : <></>}</>}>
                <div className={styles.user_list__container}>
                    <TableList columns={columns}
                        setSelected={setSelectedUsers} selected={selectedUsers} data={admins.map(el => ({ id: el.id, data: [el.name, el.email, '* * * * * *'] }))} />
                    <UsePagination items={items} />
                </div>

            </AdminLayout>

        </div >

    )
}

export default AdminList;