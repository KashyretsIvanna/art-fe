import { ReactElement } from "react";
import styles from "./ModalLaout.module.scss";


const ModalLayout = ({ closeModal, modal }: { closeModal: () => void, modal: ReactElement }) => {


    return (
        <>
            <div className={styles.darkBG} onClick={() => closeModal()} />
            <div className={styles.centered}>
                {modal}
            </div>
        </>
    );
};

export default ModalLayout;
