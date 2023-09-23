
import styles from './Premium.module.scss'
import PremiumImg from '../../../images/icons/premium.svg'

function PremiumItem() {
    return (
        <>
            <div className={styles.premium}>
                <img className={styles.premium__icon} src={PremiumImg} alt='' />
                <div className={styles.premium__text}>Premium</div>
            </div>
        </>

    )
}

export default PremiumItem;
