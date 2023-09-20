
import styles from './MenuItem.module.scss'
import bird from '../../../images/icons/bird.svg'

function MenuItem({ text, icon }: { text: string, icon: string }) {
    return (
        <>
            <div className={styles.menu_item_container}>
                <img className={styles.menu_icon} src={icon} alt='' />
                <div className={styles.menu_text}>{text}</div>
                <img className={styles.bird} src={bird} alt='bird' />
            </div>
        </>

    )
}

export default MenuItem;
