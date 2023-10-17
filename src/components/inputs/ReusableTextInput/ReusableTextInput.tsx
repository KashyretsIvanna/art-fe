import styles from './ReusableTextInput.module.scss'

function ReusableTextInput({
    data, setData, placeholder, label, error
}: { label: string, error: string, data: string | undefined, setData: React.Dispatch<React.SetStateAction<string | undefined>>, placeholder: string }) {



    return (

        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <input className={error ? styles.input_text__error : styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
            <div className={styles.input_text__error_message}><p >{error}</p></div>
        </div>

    )
}

export default ReusableTextInput;
