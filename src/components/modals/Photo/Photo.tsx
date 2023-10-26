import CloseCircleCross from "../../buttons/CloseCircleCross/CloseCircleCross";
import styles from "./Photo.module.scss";


const ModalWithPhoto = ({ closeModal, img }: { closeModal: () => void, img: string | undefined }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => closeModal()} />
            <div className={styles.centered}>
                <div className={styles.modal}>

                    <button className={styles.closeBtn} onClick={() => closeModal()}>
                        <CloseCircleCross clickButton={function (): void {
                            closeModal()
                        }} />
                    </button>
                    <div>
                        <img src={img} alt="img" />


                    </div>



                </div>
            </div>
        </>
    );
};

export default ModalWithPhoto;
