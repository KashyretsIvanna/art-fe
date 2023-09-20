import { useState } from 'react'
import styles from './Checkbox.module.scss'
import CheckImg from '../../../images/icons/check.svg'


function CheckBox() {


    const [isChecked, setChecked] = useState<boolean>(false)

    function icon() {
        return isChecked ? <img className={styles.checkbox__icon} src={CheckImg} alt='check' /> : ''
    }

    function toggle() {
        setChecked(prev => !prev)
    }

    return (
        <button
            className={isChecked ? styles.checkbox__button_checked : styles.checkbox__button}
            onClick={toggle}>
            <div className={styles.checkbox__button__check}>
                {icon()}
            </div>
            <div className={styles.checkbox__button__content}>
                {/* {this.props.children} */}
            </div>
        </button>

    )
}

export default CheckBox;
