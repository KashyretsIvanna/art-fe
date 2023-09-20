import styles from './SectionHeaderButton.module.scss'
import PlusImg from '../../../images/icons/plus.svg'

function SectionHeaderButton({
    text, clickButton }: { text: string, clickButton: () => void }) {

    return (
        <button onClick={clickButton} className={styles.button}>
            <img src={PlusImg} alt='button' />
            <div className={styles.button__text}>{text}</div></button>

    )
}

export default SectionHeaderButton;
