
import styles from './OnlineStatus.module.scss'
import OnlineStatusIcon from '../../../images/icons/onlie.svg'

function OnlineStatus({ top, left, right, bottom }: { top?: string, left?: string, right?: string, bottom?: string }) {


    return (
        <img style={{ top, left, right, bottom }} className={styles.online_status} src={OnlineStatusIcon} />

    )
}

export default OnlineStatus;

