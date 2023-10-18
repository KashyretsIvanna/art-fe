
import styles from './GridPhotoContainer.module.scss'
import Photo from '../../inputs/Photo/Photo';

function GridPhotoContainer() {


    return (
        <div className={styles.grid_photo}>
            <div className={styles.grid_photo__a}> <Photo order={1} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__b}> <Photo order={2} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__c}> <Photo order={3} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__d}> <Photo order={4} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__e}> <Photo order={5} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__i}> <Photo order={6} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__j}> <Photo order={7} onChange={(value) => { console.log(value) }} /></div>
            <div className={styles.grid_photo__k}> <Photo order={8} onChange={(value) => { console.log(value) }} /></div>


        </div>
    )
}

export default GridPhotoContainer;

