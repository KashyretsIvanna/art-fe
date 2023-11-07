import styles from './ReusableButton.module.scss'


function ReusableButton({
    text, clickButton }: { text: string, clickButton: () => void }) {

    return (
        <button onClick={clickButton} className={styles.button}>{text}</button>
    )
}

export default ReusableButton;
