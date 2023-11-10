import styles from './ReusableButton.module.scss'


function ReusableButton({
    text, clickButton, color }: { text: string, color?: string, clickButton: () => void }) {

    return (
        <button style={{ backgroundColor: color }} onClick={clickButton} className={styles.button}>{text}</button>
    )
}

export default ReusableButton;
