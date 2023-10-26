import styles from './CloseCircleCross.module.scss'
import crossIcon from '../../../images/icons/cross.svg'

function CloseCircleCross({
    clickButton }: { clickButton: () => void }) {

    return (
        <button onClick={clickButton} className={styles.button}><img src={crossIcon} /></button>
    )
}

export default CloseCircleCross;
