import { useEffect, useState } from 'react';
import styles from './InputSelect.module.scss'
import BirdImg from '../../../images/icons/buird.svg'

const InputPopup = ({ options, onChange, label, setSelectedOption, selectedOption, error, isDropdownOpen }: {
    label: string, options: { value: string, label: string }[], error: string, setSelectedOption: React.Dispatch<React.SetStateAction<{
        value: string;
        label: string;
    }>>, selectedOption: {
        value: string;
        label: string;
    }, onChange: (value: { value: string, label: string }) => void,
    isDropdownOpen: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsOpen(isDropdownOpen)
    }, [isDropdownOpen])

    const handleOptionClick = (option: { value: string, label: string }) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <div className={isOpen ? styles.custom_select__active : styles.custom_select}>
                <div className={error ? styles.custom_select__header__error : styles.custom_select__header} onClick={toggleDropdown}>
                    <img className={styles.custom_select__icon} src={BirdImg} alt='bird' />
                    {selectedOption ? selectedOption.label : 'Select an option'}
                    <div className={styles.input__error_message}><p>{error}</p></div>

                </div>
                {isOpen && (
                    <div className={error ? styles.custom_select__option_container__error : styles.custom_select__option_container}>
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

