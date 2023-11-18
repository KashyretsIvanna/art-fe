import styles from './NumberInputPremium.module.scss'

function NumberInputPremium({
    data, setData, placeholder, label, max, min, error
}: { label: string, max: number, error: string, min: number, data: number | undefined, setData: React.Dispatch<React.SetStateAction<number | undefined>>, placeholder: string }) {

    return (

        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <input max={max} min={min} type='number' className={error ? styles.input_text__error : styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
            <div className={styles.input__error_message}><p >{error}</p></div>
        </div>

    )
}

export default NumberInputPremium;
