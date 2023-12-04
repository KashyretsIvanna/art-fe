import styles from "./AllPageLoader.module.scss";
import LoaderIcon from '../../../images/icons/loader.png'

const MainLoader = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <>
            {isLoading && <> <div className={styles.darkBG} />
                <div className={styles.centered}>
                    <div className={styles.dark}>
                        <img src={LoaderIcon} />
                    </div>
                </div></>}
        </>
    );
};

export default MainLoader;
