import { useEffect, useState } from 'react';
import styles from './SelectSearch.module.scss'

const SelectSearch = ({ options, placeholder, onOptionClick, search, setSearch, img }: {
    options: { value: string, label: string }[], onOptionClick: (value: { value: string, label: string }) => void,
    img: string, placeholder: string, search: string, setSearch: (value: string) => void
}) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleOptionClick = (option: { value: string, label: string }) => {
        onOptionClick(option);
        setIsOpen(false);
    };

    useEffect(() => {

        if (search.length) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [search])



    return (
        <div  className={styles.input_container} >
            <div  className={isOpen ? styles.custom_select__active : styles.custom_select}>
                <div className={styles.input_search_container} >
                    <img src={img} alt='search' className={styles.search} />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} ></input>
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

export default SelectSearch;

