import { useState } from 'react';
import styles from './InputSelect.module.scss'
import BirdImg from '../../../images/icons/buird.svg'

const InputPopup = ({ options, onChange, label }: { label: string, options: { value: string, label: string }[], onChange: (value: { value: string, label: string }) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ value: string, label: string }>(options[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: { value: string, label: string }) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <div className={isOpen ? styles.custom_select__active : styles.custom_select}>
                <div className={styles.custom_select__header} onClick={toggleDropdown}>
                    <img className={styles.custom_select__icon} src={BirdImg} alt='bird' />
                    {selectedOption ? selectedOption.label : 'Select an option'}
                </div>
                {isOpen && (
                    <div className={styles.custom_select__option_container}>
                        <ul className={styles.custom_select__option}>
                            {options.map((option) => (
                                <li className={styles.custom_select__option__text} key={option.value} onClick={() => handleOptionClick(option)}>
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputPopup;

