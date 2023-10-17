import styles from './ReusableTextArea.module.scss'

function ReusableTextArea({
    data, setData, placeholder, label, error
}: { label: string, data: string | undefined, error: string, setData: React.Dispatch<React.SetStateAction<string | undefined>>, placeholder: string }) {

    return (

        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <textarea className={error ? styles.input_text__error : styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
            <div className={styles.input_text__error_message}><p >{error}</p></div>
        </div>

    )
}

export default ReusableTextArea;
