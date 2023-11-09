import styles from './StatusDesign.module.scss'
import BirdIcon from '../../../images/icons/green-bird.svg'
function StatusDesign({
    text }: { text: string, }) {

    return (
        <div className={styles.status_view}>
            <div className={styles.status_view__text}>
                {text}
            </div>
            <img src={BirdIcon} alt='bird' />
        </div>

    )
}

export default StatusDesign;
