
import styles from './UserInfoList.module.scss'
import MailImg from '../../../images/icons/mail.svg'
import GlobImg from '../../../images/icons/glob.svg'
import LocationImg from '../../../images/icons/location.svg'
import PersonImg from '../../../images/icons/person.svg'
import GenderImg from '../../../images/icons/gender.svg'
import StatusImg from '../../../images/icons/status.svg'
import PaintImg from '../../../images/icons/paint.svg'
import AgeImg from '../../../images/icons/age.svg'
import { useEffect, useState } from 'react'


function UserInfoList({ email, country, city, age, gender, status, about, lookingFor }: { email: string, country: string, city: string, age: number, gender: string, status: string, about: string, lookingFor: string[] }) {



    const [items, setItems] = useState<{ icon: string, header: string, description: string | number }[]>([])

    useEffect(() => {
        setItems(
            [{ icon: MailImg, header: 'Email', description: email, },
            { icon: GlobImg, header: 'Country', description: country, },
            { icon: LocationImg, header: 'City', description: city, },
            { icon: AgeImg, header: 'Age', description: age, },
            { icon: GenderImg, header: 'Gender', description: gender, },
            { icon: StatusImg, header: 'Status', description: status, },
            { icon: PersonImg, header: 'About me', description: about, },
            { icon: PaintImg, header: "I'm looking for", description: lookingFor.join(', '), }
            ]

        )
    }, [about, age, city, country, email, gender, lookingFor, status])





    return (
        <div className={styles.info_container}>
            {
                items.map(el => <div className={styles.info_container__row} key={el.header}>
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
