
import styles from './UserInfoList.module.scss'
import MailImg from '../../../images/icons/mail.svg'
import GlobImg from '../../../images/icons/glob.svg'
import LocationImg from '../../../images/icons/location.svg'
import PersonImg from '../../../images/icons/person.svg'
import GenderImg from '../../../images/icons/gender.svg'
import StatusImg from '../../../images/icons/status.svg'
import PaintImg from '../../../images/icons/paint.svg'
import AgeImg from '../../../images/icons/age.svg'


function UserInfoList() {

    const Items = [
        { icon: MailImg, header: 'Email', description: 'kasirecivanna@gmail.com', },
        { icon: GlobImg, header: 'Country', description: 'Ukraine', },
        { icon: LocationImg, header: 'City', description: 'Kyiv', },
        { icon: AgeImg, header: 'Age', description: '19', },
        { icon: GenderImg, header: 'Gender', description: 'Male', },
        { icon: StatusImg, header: 'Status', description: 'Free', },
        { icon: PersonImg, header: 'About me', description: 'My name is Ivanna', },
        { icon: PaintImg, header: "I'm looking for", description: 'Artist', }



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
