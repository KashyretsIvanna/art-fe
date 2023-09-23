
import PremiumItem from '../../text/Premium/Premium';
import styles from './UserProfileInfoCard.module.scss'

function UserProfileInfoCard({ avatar, name, role }: { avatar: string, name: string, role: string }) {

    return (
        <div className={styles.profile_card}>
            <img className={styles.profile_card__avatar} src={avatar} alt='avatar' />
            <PremiumItem />
            <p className={styles.profile_card__name}>{name}</p>
            <p className={styles.profile_card__role}>{role}</p>

        </div>
    )
}

export default UserProfileInfoCard;
