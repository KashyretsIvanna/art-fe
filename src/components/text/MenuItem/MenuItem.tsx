
import styles from './MenuItem.module.scss'
import bird from '../../../images/icons/bird.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsSidebarOpened } from '../../../store/services/application/location/location.slice'

function MenuItem({ text, icon, to }: { text: string, icon: string, to: string }) {
    const navigate = useNavigate()

    const location = useLocation()
    const dispatch = useDispatch()



    return (
        <>
            <div className={location.pathname.includes(to) ? styles.menu_item_container__active : styles.menu_item_container} onClick={() => {
                if (window.innerWidth <= 700) {
                    dispatch(setIsSidebarOpened({ isOpened: false }))

                }
                navigate(to)
            }}>
                <img className={styles.menu_icon} src={icon} alt='' />
                <div className={styles.menu_text}>{text}</div>
                <img className={styles.bird} src={bird} alt='bird' />
            </div>
        </>

    )
}

export default MenuItem;
