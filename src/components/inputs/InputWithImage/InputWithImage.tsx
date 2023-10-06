import styles from './InputWithImage.module.scss'


function InputWithImage({
    maxLength: maxLength, data, setData, placeholder, img, isError, imgHEight, imgWidth, type, marginTop, marginLeft
}: { img: string, maxLength?: number, marginTop: string, marginLeft: string, type: 'text' | 'password', imgHEight: string, imgWidth: string, isError: boolean, data: string, setData: React.Dispatch<React.SetStateAction<string>>, placeholder: string }) {

    return (
        <div className={styles.input_container} >
            <img style={{ marginTop, marginLeft }} width={imgWidth} height={imgHEight} src={img} alt='email' className={styles.input_icon} />
            <input maxLength={maxLength} type={type === 'password' ? "password" : "text"}
                className={isError ? styles.input_container__field_error : styles.input_container__field} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder} ></input>
        </div >

    )
}

export default InputWithImage;
