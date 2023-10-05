import styles from './StepsNavigation.module.scss'
import ArrowIcon from '../../../images/icons/arrow2.svg'
function NavigationSteps({ stepNumber, totalAmountSteps, onContinue }: { stepNumber: number, totalAmountSteps: number, onContinue: () => void }) {

    return (
        <div className={styles.navigation_steps__container}>
            <button className={styles.navigation_steps__button} onClick={onContinue}>
                CONTINUE
            </button>
            <div className={styles.navigation_steps__text_container}>
                <span className={styles.navigation_steps__text}>{stepNumber} step of {totalAmountSteps}</span>
                <img className={styles.navigation_steps__arrow} src={ArrowIcon} alt='pointer' />
            </div>

        </div>

    )
}

export default NavigationSteps;
