
import styles from './MenuItem.module.scss'
import bird from '../../../images/icons/bird.svg'
import { useNavigate } from 'react-router-dom'

function MenuItem({ text, icon, to }: { text: string, icon: string, to: string }) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.menu_item_container} onClick={() => { navigate(to) }}>
                <img className={styles.menu_icon} src={icon} alt='' />
                <div className={styles.menu_text}>{text}</div>
                <img className={styles.bird} src={bird} alt='bird' />
            </div>
        </>

    )
}

export default MenuItem;
