
import { useEffect, useState } from 'react';
import styles from './PhotoPicker.module.scss'
import { CircularProgress } from '@mui/material';
import avatar from '../../../images/logo_2.svg'
import NavLeftIcon from '../../../images/icons/nav-left.svg'
import NavRightIcon from '../../../images/icons/nav-right.svg'
import OnlineStatus from '../../signs/OnlineStatus/OnlineStatus';
import MainPhoto from '../../signs/MainPhoto/MainPhoto';
import { useGetProfilePhotoByIdQuery } from '../../../store/services/api/files/files.api';
function PhotoPicker({ isPremiumVisible, isStatusVisible, imagesIds, currentPosition, setCurrentPosition }: { isPremiumVisible?: boolean, isStatusVisible?: boolean, imagesIds: { id: number, order: number }[], currentPosition: number, setCurrentPosition: React.Dispatch<React.SetStateAction<number>> }) {

    const [file, setFile] = useState<File | null>(null)
    const { data, error, isLoading } = useGetProfilePhotoByIdQuery({ profilePhotoId: imagesIds[currentPosition]?.id })

    useEffect(() => {
        if (data) {
            setFile(data)
        }
    }, [data, error, isLoading])


    return (
        <div className={styles.image_picker__container}>
            {!isLoading && currentPosition !== 0 && imagesIds.length ? <img onClick={() => { setCurrentPosition(prev => prev - 1) }} className={styles.image_picker__left} src={NavLeftIcon} /> : <div className={styles.image_picker__left}></div>}

            {isLoading ? <div className={styles.image_picker__avatar_container}><CircularProgress color="inherit" /></div>
                :
                imagesIds.length ? <div className={styles.image_picker__avatar_container}><img className={styles.image_picker__avatar} src={imagesIds.length && imagesIds[currentPosition] && file ? URL.createObjectURL(file)
                    : avatar} alt='avatar' /></div> : ''
            }
            {!isLoading && currentPosition !== imagesIds.length - 1 && imagesIds.length ? <img onClick={() => { setCurrentPosition(prev => prev + 1) }} className={styles.image_picker__right} src={NavRightIcon} /> : <div className={styles.image_picker__left}></div>}
            {!isLoading && isStatusVisible !== false && imagesIds.length ? < OnlineStatus right='42px' top='85px' /> : ''}
            {imagesIds[currentPosition]?.order === 1 && isPremiumVisible !== false && < MainPhoto left='120px' top='80px' />}

        </div>
    )
}

export default PhotoPicker;

