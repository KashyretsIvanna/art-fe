
import PremiumItem from '../../text/Premium/Premium';
import styles from './UserProfileInfoCard.module.scss'
import PhotoPicker from '../../photo-display/PhotoPicker/PhotoPicker';
import ReusableButton from '../../buttons/ReusableButton/ReusableButton';

function UserProfileInfoCard({ name, role, plan, imgIds }: { name: string, role: string, plan?: string, imgIds: { id: number, order: number }[] }) {

    return (
        <div className={styles.profile_card}>
            <PhotoPicker imagesIds={imgIds} />
            {plan !== 'STANDARD' && <PremiumItem />}
            <p className={styles.profile_card__name}>{name}</p>
            <p className={styles.profile_card__role}>{role}</p>
            <div className={styles.profile_card__set_main}>
                <ReusableButton text={'Set as main image'} clickButton={function (): void {
                    console.log('click')
                }} />
            </div>

        </div>
    )
}

export default UserProfileInfoCard;

