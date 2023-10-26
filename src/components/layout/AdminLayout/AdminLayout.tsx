
import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar'
import styles from './AdminLayout.module.scss'
import InputSearch from '../../inputs/InputSearch/InputSearch'
import SearchImg from '../../../images/icons/search.svg'
import MenuImgMobile from '../../../images/icons/menu-side.svg'
import MenuImg from '../../../images/icons/menu.svg'


import WhiteBoard from '../../layout/WhiteBoard/WhiteBoard'
import logoImg from '../../../images/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { selectLocationsConfig, setIsSidebarOpened } from '../../../store/services/application/location/location.slice';

type ChildrenProp = string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
function AdminLayout(props: { navigationItems: string[], pageHeader: string; children: ChildrenProp, headerRight: ChildrenProp }) {
    const [search, setSearch] = useState('')

    const locationData = useSelector(selectLocationsConfig)

    const dispatch = useDispatch()

    return (
        <>
            <SideBar />
            <div className={locationData.isSidebarOpened ? styles.right_side : styles.right_side__full}>
                <div className={styles.header}>

                    <div className={styles.left_side}>
                        <img onClick={() => { dispatch(setIsSidebarOpened({ isOpened: !locationData.isSidebarOpened })) }} src={MenuImg} alt='menu' className={styles.menu} />
                        <InputSearch placeholder='Search...' img={SearchImg} data={search} setData={setSearch} />
                    </div>
                    <div className={styles.header__right_side}>

                    </div>


                </div>
                <div className={styles.logo_container}>
                    <div onClick={() => { dispatch(setIsSidebarOpened({ isOpened: !locationData.isSidebarOpened })) }} className={styles.logo_container_menu}><img src={MenuImgMobile} alt='menu' className={styles.menu} /></div>
                    <img className={styles.logo} src={logoImg} alt='logo' />
                </div>
                <div className={styles.layout_body}>
                    <WhiteBoard headerRight={props.headerRight} pageHeader={props.pageHeader} navigationItems={props.navigationItems}>
                        {props.children}
                    </WhiteBoard>
                </div>
            </div >
        </>


    )
}

export default AdminLayout;
