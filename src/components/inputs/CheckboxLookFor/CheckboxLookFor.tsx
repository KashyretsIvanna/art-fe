import { useState } from 'react'
import styles from './CheckboxLookFor.module.scss'
import CheckImg from '../../../images/icons/check.svg'


function CheckBox({ onChange, label, error }: { error: string, onChange: (isChecked: boolean) => void, label: string }) {


    const [isChecked, setChecked] = useState<boolean>(false)



    function toggle() {
        setChecked(prev => !prev)
        onChange(!isChecked)
    }

    return (
        <div className={isChecked ? styles.checkbox_checked : styles.checkbox}>

            <button
                className={isChecked ? styles.checkbox__button_checked : styles.checkbox__button}
                onClick={toggle}>
                {isChecked ? <img className={styles.checkbox__icon} src={CheckImg} alt='check' /> : ''}

            </button>
            <div className={isChecked ? styles.checkbox__label_checked : styles.checkbox__label}>{label}</div>

        </div>


    )
}

export default CheckBox;
