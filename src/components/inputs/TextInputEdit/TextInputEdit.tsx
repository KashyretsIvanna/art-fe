import styles from './TextInputEdit.module.scss'
import panIcon from '../../../images/icons/pan.svg'

function TextInputEdit({
    data, setData, placeholder, error
}: { error: string, data: string | undefined, setData: React.Dispatch<React.SetStateAction<string | undefined>>, placeholder: string, min: number | undefined, max: number | undefined }) {

    return (

        <div className={styles.input_container} >
            <img src={panIcon} className={styles.input_container__pan} />
            <input className={error ? styles.input_text__error : styles.input_text} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} />
        </div>

    )
}

export default TextInputEdit;
