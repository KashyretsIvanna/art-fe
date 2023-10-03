import styles from './ReusableTextArea.module.scss'

function ReusableTextArea({
    data, setData, placeholder, label
}: { label: string, data: string | undefined, setData: React.Dispatch<React.SetStateAction<string | undefined>>, placeholder: string }) {

    return (

        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <textarea className={styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
        </div>

    )
}

export default ReusableTextArea;
