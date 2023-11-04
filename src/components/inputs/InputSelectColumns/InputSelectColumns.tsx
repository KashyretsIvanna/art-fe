import { useEffect, useState } from 'react';
import styles from './InputSelectColumns.module.scss'
import BirdImg from '../../../images/icons/buird-vertical.svg'
import panIcon from '../../../images/icons/pan.svg'

const InputSelectColumns = ({ options, onChange, setSelectedOption, selectedOption, error }: {
    label: string, options: { value: string, label: string }[], error: string, setSelectedOption: React.Dispatch<React.SetStateAction<{
        value: string;
        label: string;
    }>>, selectedOption: {
        value: string;
        label: string;
    }, onChange: (value: { value: string, label: string }) => void,
}) => {
    const [isOpen, setIsOpen] = useState(false);


    const [data, setData] = useState<{ value: string, label: string }[][]>([[]])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleOptionClick = (option: { value: string, label: string }) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };


    useEffect(() => {
        const chunkSize = 4;
        const array = []
        for (let i = 0; i < options.length; i += chunkSize) {
            const chunk = options.slice(i, i + chunkSize);
            array.push(chunk)
        }
        setData(array)

    }, [options])

    return (
        <div className={styles.input_container} >
            <div className={isOpen ? styles.custom_select__active : styles.custom_select}>
                <img src={panIcon} className={styles.input_container__pan} />

                <div className={error ? styles.custom_select__header__error : styles.custom_select__header} onClick={toggleDropdown}>
                    <img className={styles.custom_select__icon} src={BirdImg} alt='bird' />

                    {selectedOption ? selectedOption.label : 'Select an option'}
                    <div className={styles.input__error_message}><p>{error}</p></div>
                </div>
                {isOpen && (
                    <div className={error ? styles.custom_select__option_container__error : styles.custom_select__option_container}>
                        <ul className={styles.custom_select__option}>
                            {data.map((option) => (
                                <li className={styles.custom_select__option__text} key={option[0].value}>
                                    {option.map(el => <span onClick={() => { handleOptionClick(el) }} >{el.label}</span>)}

                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputSelectColumns;

