import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './UserList.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import UsePagination from '../../components/pagination/ListPagination/ListPagination';
import usePagination from '@mui/material/usePagination';
import { useGetUsersQuery } from '../../store/services/userApi';
import { useEffect, useState } from 'react';
import { UserListItemRes } from '../../store/types/user/user-list.dto';

function UserList() {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [users, setUsers] = useState<UserListItemRes[]>([])

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



    const { data } = useGetUsersQuery({ page, take: 10 })
    useEffect(() => {
        if (data) {
            setUsers(data.users)
            setTotalPages(data?.pages)
        }

    }, [data])

    return (
        <div className={styles.layout}>
            <AdminLayout pageHeader='User profile'>
                <TableList data={users} />
                <UsePagination items={items} />

            </AdminLayout>

        </div>

    )
}

export default UserList;
