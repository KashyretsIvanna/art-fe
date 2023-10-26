//TODO: uncomment when need another menu

import styles from './SideBar.module.scss'
import logoImg from '../../../images/logo.svg'
import MenuItem from '../../text/MenuItem/MenuItem'
// import homeImg from '../../../images/icons/home.svg'
// import letterImg from '../../../images/icons/letter.svg'
// import paymentImg from '../../../images/icons/payment.svg'
// import promocodeImg from '../../../images/icons/promocode.svg'
// import settingsImg from '../../../images/icons/settings.svg'
// import statsImg from '../../../images/icons/stats.svg'
import suitcaseImg from '../../../images/icons/suitcase.svg'
import usersListImg from '../../../images/icons/users-list.svg'
// import usersImg from '../../../images/icons/users.svg'
// import vipImg from '../../../images/icons/vip.svg'
import MenuImg from '../../../images/icons/menu-side.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectLocationsConfig, setIsSidebarOpened } from '../../../store/services/application/location/location.slice'
import { useEffect } from 'react'


function AdminLayout() {


    const dispatch = useDispatch()
    const locationData = useSelector(selectLocationsConfig)

    useEffect(() => {
        if (window.innerWidth <= 700) {
            dispatch(setIsSidebarOpened({ isOpened: false }))

        }

    }, [])

    return (
        <>
            {locationData.isSidebarOpened && <div className={styles.sidebar}>

                <div className={styles.logo_container}>
                    <div onClick={() => { dispatch(setIsSidebarOpened({ isOpened: !locationData.isSidebarOpened })) }} className={styles.sidebar_menu}><img src={MenuImg} alt='menu' className={styles.menu} /></div>
                    <img className={styles.logo} src={logoImg} alt='logo' />
                </div>

                <div className={styles.header}>Admin Panel</div>
                {/* <MenuItem to='/dashboard' text='Dashboard' icon={homeImg} />
                <MenuItem to='/analytics' text='Analytics' icon={statsImg} />
                <MenuItem to='/users' text='Users' icon={usersImg} /> */}
                <MenuItem to='/clients' text='List of users' icon={usersListImg} />
                <MenuItem to='/admins' text='Manage admins' icon={suitcaseImg} />
                {/* <MenuItem to='/letter' text='Send letter' icon={letterImg} />
                <MenuItem to='/promo' text='Promo code list' icon={promocodeImg} />
                <MenuItem to='/payments' text='List of payments' icon={paymentImg} />
                <MenuItem to='/vip' text='VIP Pricing' icon={vipImg} />
                <MenuItem to='/settings' text='Settings' icon={settingsImg} /> */}

            </div>
            }
        </>

    )
}

export default AdminLayout;
