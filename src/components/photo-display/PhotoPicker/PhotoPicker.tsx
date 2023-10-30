
import { useState } from 'react';
import styles from './PhotoPicker.module.scss'
import { CircularProgress } from '@mui/material';
import avatar from '../../../images/logo_2.svg'
import NavLeftIcon from '../../../images/icons/nav-left.svg'
import NavRightIcon from '../../../images/icons/nav-right.svg'
import OnlineStatus from '../../signs/OnlineStatus/OnlineStatus';
import MainPhoto from '../../signs/MainPhoto/MainPhoto';

function PhotoPicker({ images, isLoading }: { images: Array<File | null>, isLoading: boolean }) {

    const [currentPosition, setCurrentPosition] = useState(0)

    return (
        <div className={styles.image_picker__container}>
            {!isLoading && currentPosition !== images.length - 1 ? <img onClick={() => { setCurrentPosition(prev => prev - 1) }} className={styles.image_picker__left} src={NavLeftIcon} /> : <div className={styles.image_picker__left}></div>}

            {isLoading ? <CircularProgress color="inherit" />
                :
                <img className={styles.image_picker__avatar} src={images.length && images[currentPosition] ? URL.createObjectURL(images[currentPosition])
                    : avatar} alt='avatar' />
            }
            {!isLoading && currentPosition !== 0 ? <img onClick={() => { setCurrentPosition(prev => prev + 1) }} className={styles.image_picker__right} src={NavRightIcon} /> : <div className={styles.image_picker__left}></div>}
            {!isLoading && < OnlineStatus right='42px' top='85px' />}
            {!isLoading && < MainPhoto left='120px' top='80px' />}

        </div>
    )
}

export default PhotoPicker;

