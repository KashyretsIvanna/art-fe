import styles from './UnknownAmountPagination.module.scss'
import ReusableButtonWithIcon from '../../buttons/ReusableButtonWithIcon/ReusableButton';
import rightIcon from '../../../images/icons/right.svg'
import leftIcon from '../../../images/icons/left.svg'

export default function UnknownAmountPag({ onPrevClick, onNextClick, isNext, isPrev }: { onPrevClick: () => void, onNextClick: () => void, isNext: boolean, isPrev: boolean },) {


    return (
        <nav className={styles.pagination_container}>
            <div className={styles.pagination__button}><ReusableButtonWithIcon icon={leftIcon} iconPosition={'left'} color={isPrev ? '#399CFF' : '#C2C2C2'} text={'PREVIOUS'} clickButton={onPrevClick} disabled={isPrev ? false : true} /></div>
            <div className={styles.pagination__button}><ReusableButtonWithIcon icon={rightIcon} iconPosition={'right'} color={isNext ? '#399CFF' : '#C2C2C2'} text={'NEXT'} clickButton={onNextClick} disabled={isNext ? false : true} /></div>
        </nav >
    );
}