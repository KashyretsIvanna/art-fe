import styles from './ReusableTextInput.module.scss'

function ReusableNumberInput({
    data, setData, placeholder, label, max, min
}: { label: string, max: number, min: number, data: number | undefined, setData: React.Dispatch<React.SetStateAction<number | undefined>>, placeholder: string }) {

    return (

        <div className={styles.input_container} >
            <label className={styles.input_label} >{label}</label>
            <input max={max} min={min} type='number' className={styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
        </div>

    )
}

export default ReusableNumberInput;
