
import React from 'react';
import styles from './WhiteBoard.module.scss'
import PaginationItem from '../../text/PaginationItem/PaginationItem'
import SectionHeader from '../SectionHeader/SectionHeader'
import SectionHeaderButton from '../../buttons/SectionHeaderButton/SectionHeaderButton'
function AdminLayout(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {

    return (
        <div className={styles.white_board}>
            <div className={styles.white_board__navigation}>
                <PaginationItem text={'Welcome'} />
                <PaginationItem text={'Dashboard'} />
            </div>
            <div className={styles.white_board__content}>

                <div className={styles.white_board__section_header}>
                    <SectionHeader text='All Clients' />
                    <SectionHeaderButton text={'Add user'} clickButton={() => { console.log('User added') }} />
                </div>
                {props.children}

            </div>

        </div>


    )
}

export default AdminLayout;
