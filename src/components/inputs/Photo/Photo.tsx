import { useState } from 'react'
import styles from './Photo.module.scss'
import AddPhotoImg from '../../../images/icons/add-photo.svg'
import CloseCross from '../../../images/icons/close-photo.svg'
function Photo({ onChange, order }: { onChange: (isChecked: boolean) => void, order: number }) {


    const [image, setImage] = useState<string | null>(null);

    const onImageChange = (event: { target: { files: (Blob | MediaSource)[]; } }) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const onCrossClick = () => {
        if (image) {
            setImage(null)
        }

    }

    return (
        <div className={styles.photo_input}>
            <input type="file" onChange={onImageChange} className={styles.photo_input__input} />

            {image && <img className={styles.photo_input__img} src={image} alt="preview image" />}
            <img onClick={onCrossClick} className={image ? styles.photo_input__cross_remove : styles.photo_input__cross} src={image ? CloseCross : AddPhotoImg} alt='cross' />
        </div>

    )
}

export default Photo;
