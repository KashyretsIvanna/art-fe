
import { useEffect, useState } from 'react';
import PremiumItem from '../../text/Premium/Premium';
import styles from './UserProfileInfoCard.module.scss'
import { useGetProfilePhotoByIdQuery } from '../../../store/services/api/files/files.api';
import PhotoPicker from '../../photo-display/PhotoPicker/PhotoPicker';

function UserProfileInfoCard({ name, role, plan, imgId }: { name: string, role: string, plan?: string, imgId: number }) {

    const [file, setFile] = useState<File | null>(null)
    const { data, error, isLoading } = useGetProfilePhotoByIdQuery({ profilePhotoId: imgId })

    useEffect(() => {
        if (data) {
            setFile(data)
        }
    }, [data, error, isLoading,imgId])
    return (
        <div className={styles.profile_card}>
            <PhotoPicker images={data ? [file] : []} isLoading={isLoading} />

            {plan !== 'STANDARD' && <PremiumItem />}
            <p className={styles.profile_card__name}>{name}</p>
            <p className={styles.profile_card__role}>{role}</p>

        </div>
    )
}

export default UserProfileInfoCard;

