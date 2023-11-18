import styles from './GivePremiumBytton.module.scss'


function GivePremiumButton({
    text, clickButton }: { text: string, clickButton: () => void }) {

    return (

        <button onClick={clickButton} className={styles.button}>{text}</button>
    )
}

export default GivePremiumButton;
