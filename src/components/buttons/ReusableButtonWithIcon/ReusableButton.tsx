import styles from './ReusableButton.module.scss'


function ReusableButtonWithIcon({
    text, clickButton, disabled, icon, iconPosition, color }: { icon: string, disabled: boolean, iconPosition: 'left' | 'right', color: string, text: string, clickButton: () => void }) {

    return (
        <button disabled={disabled} style={{ backgroundColor: color, cursor: !disabled ? 'pointer' : 'default' }} onClick={clickButton} className={styles.button}>
            {iconPosition === 'left' ? <img alt='icon' src={icon} /> : <></>}
            <div>{text}</div>
            {iconPosition === 'right' ? <img alt='icon' src={icon} /> : <></>}
        </button>
    )
}

export default ReusableButtonWithIcon;
