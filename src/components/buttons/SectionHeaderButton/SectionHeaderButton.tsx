import styles from './SectionHeaderButton.module.scss'

function SectionHeaderButton({
    text, icon, clickButton, background, color }: { background: string, icon: string, color: string, text: string, clickButton: () => void }) {

    return (
        <button style={{ backgroundColor: background }} onClick={clickButton} className={styles.button}>
            <img src={icon} alt='button' />
            <div style={{ color }} className={styles.button__text}>{text}</div></button>

    )
}

export default SectionHeaderButton;
