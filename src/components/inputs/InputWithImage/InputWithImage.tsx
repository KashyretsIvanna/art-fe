import styles from './InputWithImage.module.scss'


function InputWithImage({
    data, setData, placeholder, img
}: { img: string, data: string, setData: React.Dispatch<React.SetStateAction<string>>, placeholder: string }) {

    return (
        <div className={styles.input_container} >
            <img src={img} alt='email' className={styles.input_icon} />
            <input value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} ></input>
        </div>

    )
}

export default InputWithImage;
