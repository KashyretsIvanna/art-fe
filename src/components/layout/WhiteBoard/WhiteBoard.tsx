
import React from 'react';
import styles from './WhiteBoard.module.scss'
import PaginationItem from '../../text/PaginationItem/PaginationItem'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArrowIcon from '../../../images/icons/arrow.svg'

type ChildrenProp = string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;

function AdminLayout(props: { pageHeader: string, children: ChildrenProp, headerRight: ChildrenProp }) {

    return (
        <div className={styles.white_board}>
            <div className={styles.white_board__navigation}>
                <PaginationItem text={'Welcome'} />
                <PaginationItem text={'Dashboard'} />
            </div>
            <div className={styles.white_board__content}>

                <div className={styles.white_board__section_header}>
                    <div onClick={() => { console.log('Go back') }} className={styles.white_board__section_header__header_back}>
                        <img src={ArrowIcon} alt='arrow' />
                        <div>Back</div>
                    </div>
                    <SectionHeader text={props.pageHeader} />
                    <div className={styles.white_board__header_right} >
                        {props.headerRight}
                    </div>
                </div>
                {props.children}

            </div>

        </div>


    )
}

export default AdminLayout;
