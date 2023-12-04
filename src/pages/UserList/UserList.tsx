import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import styles from './UserList.module.scss'
import TableList from '../../components/lists/TableList/TableList'
import UsePagination from '../../components/pagination/ListPagination/ListPagination';
import usePagination from '@mui/material/usePagination';
import { useDeleteUsersMutation, useGetUsersQuery } from '../../store/services/admin-api/user/userApi';
import { useEffect, useState } from 'react';
import { UserListItemRes } from '../../store/types/user/user-list.dto';
import DeleteIcon from '../../images/icons/delete.svg'
import PlusImg from '../../images/icons/plus.svg'
import SectionHeaderButton from '../../components/buttons/SectionHeaderButton/SectionHeaderButton';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLoader from '../../components/loaders/AllPageLoader/AllPageLoader';

function UserList() {
    const location = useLocation()
    const [page, setPage] = useState<number>(location.state?.pageNumber?.pageNumber || 1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [users, setUsers] = useState<UserListItemRes[]>([])
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const navigate = useNavigate()
    const { data, isLoading } = useGetUsersQuery({ page, take: 10 })
    const { items } = usePagination({
        count: totalPages,
        defaultPage: location.state?.pageNumber?.pageNumber || 1
    });
    const [isUsersLoading, setIsUsersLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setUsers(data.users)
            setTotalPages(data?.pages)
        }

    }, [data])

    const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUsersMutation()

    useEffect(() => {
        const pageSelected = items.filter(el => el.selected === true)[0]
        if (pageSelected?.page) {
            setPage(pageSelected?.page || 1)

        }
    }, [items])

    const onDeleteButtonClick = () => {
        selectedUsers.map(async el => {
            await deleteUser({ userId: el })
        })
        setSelectedUsers([])
    }

    useEffect(() => {
        if (location.state?.pageNumber?.pageNumber) {
            setPage(Number(location.state.pageNumber?.pageNumber || 1))
        }
    }, [location])
    const columns = ["Name", "Email", "Country", "City", "Gender", "About me", "Status", "I'm looking for"]

    return (
        <div className={styles.layout}>
            <AdminLayout isBackButtonVisible={false} navigationItems={['All clients']} pageHeader='' headerRight={<>
                {selectedUsers.length ? <SectionHeaderButton icon={DeleteIcon} text={'DELETE'} clickButton={() => { onDeleteButtonClick() }} background={'#EE3143'} color={'#fffff'} /> : <></>}
                {!selectedUsers.length ? <SectionHeaderButton icon={PlusImg} text={'ADD USER'} clickButton={() => { navigate('/clients/registration') }} background={'#FF9700'} color={'#ffff'} /> : <></>}</>}>
                <div className={styles.user_list__container}>
                    <TableList pageNumber={page} columns={columns}
                        setSelected={setSelectedUsers} selected={selectedUsers} data={users.map(el => ({ id: el.id, data: [el.name, el.email, el.country, el.city, el.gender, el.role, el.plan, el.isLookingForArtist ? 'Artist' : el.isLookingForGallery ? 'Gallery' : el.isLookingForCollector ? 'Collector' : ''] }))} isCheckbox={true} />
                    <UsePagination items={items} />
                </div>

            </AdminLayout>

            <MainLoader isLoading={isLoading || isUsersLoading || isDeleteLoading} />

        </div >

    )
}

export default UserList;
