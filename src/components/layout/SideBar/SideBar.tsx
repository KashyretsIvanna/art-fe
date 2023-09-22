import styles from './SideBar.module.scss'
import logoImg from '../../../images/logo.svg'
import MenuItem from '../../text/MenuItem/MenuItem'
import homeImg from '../../../images/icons/home.svg'
import letterImg from '../../../images/icons/letter.svg'
import paymentImg from '../../../images/icons/payment.svg'
import promocodeImg from '../../../images/icons/promocode.svg'
import settingsImg from '../../../images/icons/settings.svg'
import statsImg from '../../../images/icons/stats.svg'
import suitcaseImg from '../../../images/icons/suitcase.svg'
import usersListImg from '../../../images/icons/users-list.svg'
import usersImg from '../../../images/icons/users.svg'
import vipImg from '../../../images/icons/vip.svg'


function AdminLayout() {
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.logo_container}>
                    <img className={styles.logo} src={logoImg} alt='logo' />
                </div>

                <div className={styles.header}>Admin Panel</div>

                <MenuItem text='Dashboard' icon={homeImg} />
                <MenuItem text='Analytics' icon={statsImg} />
                <MenuItem text='Users' icon={usersImg} />
                <MenuItem text='List of users' icon={usersListImg} />
                <MenuItem text='Manage admins' icon={suitcaseImg} />
                <MenuItem text='Send letter' icon={letterImg} />
                <MenuItem text='Promo code list' icon={promocodeImg} />
                <MenuItem text='List of payments' icon={paymentImg} />
                <MenuItem text='VIP Pricing' icon={vipImg} />
                <MenuItem text='Settings' icon={settingsImg} />

            </div>
        </>

    )
}

export default AdminLayout;