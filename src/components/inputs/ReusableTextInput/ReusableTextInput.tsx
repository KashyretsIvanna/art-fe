import styles from './ReusableTextInput.module.scss'

function ReusableTextInput({
    data, setData, placeholder, label
}: { label: string, data: string | undefined, setData: React.Dispatch<React.SetStateAction<string | undefined>>, placeholder: string }) {

    return (

        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <input className={styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
        </div>

    )
}

export default ReusableTextInput;
