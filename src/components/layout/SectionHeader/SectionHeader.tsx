
import React from 'react';
import styles from './SectionHeader.module.scss'
import SectionRectangle from '../../../images/icons/section-rectangle.svg'


function SectionHeader({ text }: { text: string }) {

    return (
        <div className={styles.section_header}>
            <img src={SectionRectangle} className={styles.section_header__rectangular} alt='rectangular' />
            <div className={styles.section_header__text}>{text}</div>
    
        </div>


    )
}

export default SectionHeader;
