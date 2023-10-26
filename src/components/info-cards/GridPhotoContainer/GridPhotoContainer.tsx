
import styles from './GridPhotoContainer.module.scss'
import Photo from '../../inputs/Photo/Photo';

function GridPhotoContainer({ setPhotoList, setPhotoToOpen }: {
    setPhotoList: React.Dispatch<React.SetStateAction<{
        file: (Blob | MediaSource) | null;
        order: number;
    }[]>>,
    setPhotoToOpen: React.Dispatch<React.SetStateAction<string | undefined>>
}) {

    return (
        <div className={styles.grid_photo}>
            <div className={styles.grid_photo__a}> <Photo setPhotoToOpen={setPhotoToOpen} order={1} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__b}> <Photo setPhotoToOpen={setPhotoToOpen} order={2} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__c}> <Photo setPhotoToOpen={setPhotoToOpen} order={3} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__d}> <Photo setPhotoToOpen={setPhotoToOpen} order={4} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__e}> <Photo setPhotoToOpen={setPhotoToOpen} order={5} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__i}> <Photo setPhotoToOpen={setPhotoToOpen} order={6} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__j}> <Photo setPhotoToOpen={setPhotoToOpen} order={7} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>
            <div className={styles.grid_photo__k}> <Photo setPhotoToOpen={setPhotoToOpen} order={8} onChange={(newFile) => { setPhotoList(prev => [...prev.filter(el => el.order !== newFile.order), newFile]) }} /></div>


        </div>
    )
}

export default GridPhotoContainer;

