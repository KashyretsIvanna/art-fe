
import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar'
import styles from './AdminLayout.module.scss'
import SearchImg from '../../../images/icons/search.svg'
import MenuImgMobile from '../../../images/icons/menu-side.svg'
import MenuImg from '../../../images/icons/menu.svg'

import WhiteBoard from '../../layout/WhiteBoard/WhiteBoard'
import logoImg from '../../../images/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { selectLocationsConfig, setIsSidebarOpened } from '../../../store/services/application/location/location.slice';
import { useGetUsersQuery } from '../../../store/services/admin-api/user/userApi';
import SelectSearch from '../../inputs/SelectSearch/SelectSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPaymentsQuery } from '../../../store/services/admin-api/payments/paymentsApi';

type ChildrenProp = string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
function AdminLayout(props: { onBackButtonClick: () => void, navigationItems: string[], backButtonState: { pageNumber: number | undefined }, pageHeader: string; children: ChildrenProp, headerRight: ChildrenProp, isBackButtonVisible: boolean }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [search, setSearch] = useState('')
    const [searchPayments, setSearchPayments] = useState('')

    const [isSearchOpen, setSearchOpen] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState<{
        value: string;
        label: string;
    }[]>([])
    const [filteredPayments, setFilteredPayments] = useState<{
        value: string;
        label: string;
    }[]>([])

    const locationData = useSelector(selectLocationsConfig)
    const { data } = useGetUsersQuery({ search: search.replace('+', '%2B') })
    const { data: payments } = useGetPaymentsQuery({ search: searchPayments.replace('+', '%2B'), limit: 100 })


    useEffect(() => {
        if (data && location.pathname.includes('clients')) {
            setFilteredUsers(data.users.map(el => ({ label: `${el.name} ${el.email} ${el.city ? ' ' + el.city : ''}${el.country ? ' ' + el.country : ''}`, value: el.id.toString() })))
        }
        if (payments && location.pathname.includes('payments')) {
            setFilteredPayments(payments?.data.map(el => ({ label: `${el.customer.name} ${el.customer.email} ${el.currency ? ' ' + el.currency : ''}${el.amount ? ' ' + Number(el.amount) / 100 : ''}`, value: el.id.toString() })))
        }
    }, [data, payments])


    return (
        <>
            <SideBar />
            <div onClick={(e) => {
                if (e.target?.className !== '_custom_select__option__text_1v1m2_147') {
                    setSearchOpen(false)
                }
            }} className={locationData.isSidebarOpened ? styles.right_side : styles.right_side__full}>
                <div className={styles.header}>

                    <div className={styles.left_side}>
                        <img onClick={() => {


                            dispatch(setIsSidebarOpened({ isOpened: !locationData.isSidebarOpened }))
                        }} src={MenuImg} alt='menu' className={styles.menu} />
                        {location.pathname.includes('clients') && <SelectSearch isSearchOpen={isSearchOpen} setSearchOpen={setSearchOpen} placeholder='Search...' img={SearchImg} search={search} setSearch={setSearch} options={filteredUsers} onOptionClick={function (value: { value: string; label: string; }): void {
                            navigate(`/clients/${value.value}`)
                        }} />}
                        {location.pathname.includes('payments') && <SelectSearch isSearchOpen={isSearchOpen} setSearchOpen={setSearchOpen} placeholder='Search...' img={SearchImg} search={searchPayments} setSearch={setSearchPayments} options={filteredPayments} onOptionClick={function (value: { value: string; label: string; }): void {
                            navigate(`/payments/${value.value}`)

                        }} />}
                    </div>
                    <div className={styles.header__right_side}>

                    </div>


                </div>
                <div className={styles.logo_container}>
                    <div onClick={() => { dispatch(setIsSidebarOpened({ isOpened: !locationData.isSidebarOpened })) }} className={styles.logo_container_menu}><img src={MenuImgMobile} alt='menu' className={styles.menu} /></div>
                    <img className={styles.logo} src={logoImg} alt='logo' />
                </div>
                <div className={styles.layout_body}>
                    <WhiteBoard onBackButtonClick={props.onBackButtonClick} backButtonState={props.backButtonState} isBackButtonVisible={props.isBackButtonVisible} headerRight={props.headerRight} pageHeader={props.pageHeader} navigationItems={props.navigationItems}>
                        {props.children}
                    </WhiteBoard>
                </div>
            </div >
        </>


    )
}

export default AdminLayout;
