
import styles from './MainPhoto.module.scss'
import MainPhotoIcon from '../../../images/icons/main-photo.svg'

function MainPhoto({ top, left, right, bottom }: { top?: string, left?: string, right?: string, bottom?: string }) {
    return (
        <img style={{ top, left, right, bottom }} className={styles.main_photo} src={MainPhotoIcon} />
    )
}

export default MainPhoto;

