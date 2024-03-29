import { useEffect, useState } from 'react';
import styles from './MultiSelect.module.scss'
import BirdImg from '../../../images/icons/buird.svg'
import RemoveIcon from '../../../images/icons/remove.svg'
const MultiSelect = ({ options, label, setSelectedOption, selectedOption, error, isDropdownOpen }: {
    label: string, options: { value: string, label: string }[], setSelectedOption: React.Dispatch<React.SetStateAction<{
        value: string;
        label: string;
    }[]>>, selectedOption: {
        value: string;
        label: string;
    }[],
    error: string | null,
    isDropdownOpen: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e: any) => {
        if (e.target.className.includes('icon') || e.target.children.length && e.target.children[0].localName === 'img') {
            setIsOpen(!isOpen);

        }
    };

    useEffect(() => {
        setIsOpen(isDropdownOpen)
    }, [isDropdownOpen])

    const handleOptionClick = (option: { value: string, label: string }) => {
        setSelectedOption(prev => [...prev, option]);
    };

    return (
        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <div className={isOpen ? styles.custom_select__active : styles.custom_select}>
                <div className={error ? styles.custom_select__header__error : styles.custom_select__header} onClick={toggleDropdown}>
                    <img className={styles.custom_select__icon} src={BirdImg} alt='bird' />
                    <ul className={styles.custom_select__header_options}>
                        {selectedOption.map((option) => (
                            <li className={styles.custom_select__header_option} key={option.value} >
                                <div>{option.label}</div>
                                <img src={RemoveIcon} alt='remove' onClick={() => {
                                    setSelectedOption(prev => prev.filter(el => el !== option))
                                }} />
                            </li>
                        ))}
                    </ul>
                    <div className={styles.custom_select__error_message}><p>{error}</p></div>

                </div>
                {isOpen && (
                    <div className={error ? styles.custom_select__option_container__error : styles.custom_select__option_container}>
                        <ul className={styles.custom_select__options}>
                            {options.filter(el => !selectedOption.includes(el)).map((option) => (
                                <li className={styles.custom_select__option_item} key={option.value} onClick={() => handleOptionClick(option)}>
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

export default MultiSelect;

