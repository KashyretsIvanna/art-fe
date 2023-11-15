import { useState } from 'react'
import styles from './Photo.module.scss'
import AddPhotoImg from '../../../images/icons/add-photo.svg'
import CloseCross from '../../../images/icons/close-photo.svg'
function Photo({ setPhotoToOpen, onChange, order }: { onChange: (data: { file: (Blob | MediaSource) | null; order: number }) => void, order: number, setPhotoToOpen: React.Dispatch<React.SetStateAction<string | undefined>> }) {


    const [image, setImage] = useState<string | null>(null);

    const onImageChange = (event: { target: { files: (Blob | MediaSource)[]; } }) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            onChange({ file: event.target.files[0], order })


        }
    };

    const onCrossClick = () => {
        if (image) {
            setImage(null)
            onChange({ file: null, order })

        }

    }

    return (
        <div className={styles.photo_input}>
            {!image && <input type="file" onChange={onImageChange} className={styles.photo_input__input} />}

            {image && <img onClick={(e) => {

                e.preventDefault()
                setPhotoToOpen(image)
            }} className={styles.photo_input__img} src={image} alt="preview image" />}
            <img onClick={onCrossClick} className={image ? styles.photo_input__cross_remove : styles.photo_input__cross} src={image ? CloseCross : AddPhotoImg} alt='cross' />
        </div>

    )
}

export default Photo;
