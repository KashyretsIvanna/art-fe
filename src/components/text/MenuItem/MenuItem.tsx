
import styles from './MenuItem.module.scss'
import bird from '../../../images/icons/bird.svg'
import { useLocation, useNavigate } from 'react-router-dom'

function MenuItem({ text, icon, to }: { text: string, icon: string, to: string }) {
    const navigate = useNavigate()

    const location = useLocation()



    return (
        <>
            <div className={location.pathname.includes(to) ? styles.menu_item_container__active : styles.menu_item_container} onClick={() => {
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
