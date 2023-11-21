import React from 'react';
import styles from './WhiteBoard.module.scss'
import PaginationItem from '../../text/PaginationItem/PaginationItem'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArrowIcon from '../../../images/icons/arrow.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import BackMobile from '../../../images/icons/back-mobile.svg'
type ChildrenProp = string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;

function AdminLayout(props: { backButtonState: any, onBackButtonClick: () => void, pageHeader: string, children: ChildrenProp, headerRight: ChildrenProp, navigationItems: string[], isBackButtonVisible: boolean }) {

    const navigate = useNavigate()
    const location = useLocation()


    return (
        <div className={styles.white_board}>
            <div className={styles.white_board__navigation}>
                {
                    props.navigationItems.map(el => <PaginationItem key={el} text={el} />
                    )
                }
            </div>
            <div className={styles.white_board__content}>

                <div className={styles.white_board__section_header}>

                    {props.isBackButtonVisible && <> <div onClick={() => {
                        if (props.onBackButtonClick) {
                            props.onBackButtonClick()
                        } else {
                            if (location.pathname.includes('/clients/') && props.backButtonState) {
                                navigate('/clients', {
                                    state: {
                                        pageNumber: props.backButtonState
                                    }
                                })
                            } else {
                                navigate(-1)
                            }
                        }

                    }} className={styles.white_board__section_header__header_back}>
                        <img src={ArrowIcon} alt='arrow' />
                        <div className={styles.white_board__button_text}>Back</div>
                    </div>
                        <div onClick={() => { navigate(-1) }} className={styles.white_board__header_back__mobile}>
                            <div className={styles.white_board__header__pointer}><img src={BackMobile} alt='arrow' /></div>
                            <div className={styles.white_board__button_text}>Back</div>
                        </div></>}

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
