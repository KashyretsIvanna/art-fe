import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './UserList.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import UsePagination from '../../components/pagination/ListPagination/ListPagination';
import usePagination from '@mui/material/usePagination';

function UserList() {
    const { items } = usePagination({
        count: 10,
        defaultPage: 1
    });

    return (
        <div className={styles.layout}>
            <AdminLayout>
                <TableList />
                <UsePagination items={items} />

            </AdminLayout>

        </div>

    )
}

export default UserList;
