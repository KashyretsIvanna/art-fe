import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './UserList.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import UsePagination from '../../components/pagination/ListPagination/ListPagination';
import usePagination from '@mui/material/usePagination';
import { useDeleteUsersMutation, useGetUsersQuery } from '../../store/services/user/userApi';
import { useEffect, useState } from 'react';
import { UserListItemRes } from '../../store/types/user/user-list.dto';
import DeleteIcon from '../../images/icons/delete.svg'
import PlusImg from '../../images/icons/plus.svg'
import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [users, setUsers] = useState<UserListItemRes[]>([])
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const navigate = useNavigate()

    const { items } = usePagination({
        count: totalPages,
        defaultPage: 1
    });

    const [deleteUser] = useDeleteUsersMutation()

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

    const onDeleteButtonClick = () => {
        selectedUsers.map(async el => {
            await deleteUser({ userId: el })
        })
        setSelectedUsers([])
    }




    return (
        <div className={styles.layout}>
            <AdminLayout navigationItems={['All clients']} pageHeader='User profile' headerRight={<>
                {selectedUsers.length ? <SectionHeaderButton icon={DeleteIcon} text={'DELETE'} clickButton={() => { onDeleteButtonClick() }} background={'#EE3143'} color={'#fffff'} /> : <></>}
                {!selectedUsers.length ? <SectionHeaderButton icon={PlusImg} text={'ADD USER'} clickButton={() => { navigate('/clients/add') }} background={'#FF9700'} color={'#ffff'} /> : <></>}</>}>
                <div className={styles.user_list__container}>
                    <TableList setSelected={setSelectedUsers} selected={selectedUsers} data={users} />
                    <UsePagination items={items} />
                </div>

            </AdminLayout>

        </div >

    )
}

export default UserList;
