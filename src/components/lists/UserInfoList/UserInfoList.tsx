
import styles from './UserInfoList.module.scss'
import icon from '../../../images/icons/next.svg'

function UserInfoList() {

    const Items = [
        { icon, header: 'Email', description: 'kasirecivanna@gmail.com', },
        { icon, header: 'Country', description: 'Ukraine', },
        { icon, header: 'City', description: 'Kyiv', },
        { icon, header: 'Age', description: '19', },
        { icon, header: 'Gender', description: 'Male', },
        { icon, header: 'Status', description: 'Free', },
        { icon, header: 'About me', description: 'My name is Ivanna', },
        { icon, header: "I'm looking for", description: 'Artist', }



    ]

    return (
        <div className={styles.info_container}>
            {
                Items.map(el => <div className={styles.info_container__row} key={el.header}>
                    <div className={styles.info_container__header}>
                        <img src={el.icon} alt={el.header} /><div>{el.header}</div>
                    </div>
                    <div className={styles.info_container__description}>{el.description}</div>

                </div>)
            }

        </div>

    )
}

export default UserInfoList;
