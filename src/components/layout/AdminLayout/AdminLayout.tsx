
import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar'
import styles from './AdminLayout.module.scss'
import InputSearch from '../../inputs/InputSearch/InputSearch'
import SearchImg from '../../../images/icons/search.svg'
import MenuImg from '../../../images/icons/menu.svg'
import settingsImg from '../../../images/icons/settings.svg'
import englishImg from '../../../images/icons/eng.svg'

import WhiteBoard from '../../layout/WhiteBoard/WhiteBoard'

function AdminLayout(props: { pageHeader: string; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    const [search, setSearch] = useState('')

    return (
        <>
            <SideBar />
            <div className={styles.right_side}>
                <div className={styles.header}>

                    <div className={styles.left_side}>
                        <img src={MenuImg} alt='menu' className={styles.menu} />
                        <InputSearch placeholder='Search...' img={SearchImg} data={search} setData={setSearch} />
                    </div>
                    <div className={styles.header__right_side}>
                        <img src={settingsImg} alt='settings' className={styles.settings} />
                        <img src={englishImg} alt='language' className={styles.lang} />

                    </div>
                </div>
                <div className={styles.layout_body}>
                    <WhiteBoard pageHeader={props.pageHeader}>
                        {props.children}
                    </WhiteBoard>
                </div>
            </div >
        </>


    )
}

export default AdminLayout;
