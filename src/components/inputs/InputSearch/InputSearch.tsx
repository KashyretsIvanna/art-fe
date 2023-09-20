import styles from './InputSearch.module.scss'

function InputSearch({
    data, setData, placeholder, img
}: { img: string, data: string, setData: React.Dispatch<React.SetStateAction<string>>, placeholder: string }) {

    return (
        <div className={styles.input_container} >
            <img src={img} alt='search' className={styles.search} />
            <input value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} ></input>
        </div>

    )
}

export default InputSearch;
