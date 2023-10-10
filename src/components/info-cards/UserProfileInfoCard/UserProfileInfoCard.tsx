
import { useEffect, useState } from 'react';
import PremiumItem from '../../text/Premium/Premium';
import styles from './UserProfileInfoCard.module.scss'
import { useGetProfilePhotoByIdQuery } from '../../../store/services/api/files/files.api';
import { CircularProgress } from '@mui/material';

function UserProfileInfoCard({ avatar, name, role, plan, imgId }: { avatar: string, name: string, role: string, plan?: string, imgId: number }) {

    const [file, setFile] = useState<File | null>(null)

    const { data, error, isLoading } = useGetProfilePhotoByIdQuery({ profilePhotoId: imgId })
    useEffect(() => {
        if (data) {

            setFile(data)
        }



    }, [data, error, isLoading])
    return (
        <div className={styles.profile_card}>
            {isLoading ? <CircularProgress color="inherit" />
                :
                <img className={styles.profile_card__avatar} src={file ? URL.createObjectURL(file)
                    : avatar} alt='avatar' />}
            {plan !== 'STANDARD' && <PremiumItem />}
            <p className={styles.profile_card__name}>{name}</p>
            <p className={styles.profile_card__role}>{role}</p>

        </div>
    )
}

export default UserProfileInfoCard;

