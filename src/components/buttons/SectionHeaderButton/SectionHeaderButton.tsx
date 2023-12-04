import styles from './SectionHeaderButton.module.scss'

function SectionHeaderButton({
    text, icon, clickButton, background, color }: { background: string, icon: string, color: string, text: string, clickButton: () => void }) {

    return (
        <button style={{ backgroundColor: background }} onClick={clickButton} className={styles.button}>
            {icon ? <img src={icon} alt='button' /> : <span style={{ height: '16px', color: background }}>e</span>}
            <div style={{ color }} className={styles.button__text}>{text}</div>

            {icon ? <></> : <span style={{ height: '16px', color: background }}>e</span>}
        </button>


    )
}



export default SectionHeaderButton;
