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
import InputSelectColumns from '../../inputs/InputSelectColumns/InputSelectColumns'
import TextInputEdit from '../../inputs/TextInputEdit/TextInputEdit'
import useManageProfile from '../../../customHooks/useManageProfile'

function UserInfoList({ email, isEdit, onSaveChanges, onCancelChanges, country, city, age, gender, status, about, lookingFor }: { email: string, isEdit: boolean, onSaveChange: () => void, onCancelChanges: () => void, country: string, city: string, age: number | string, gender: string, status: string, about: string, lookingFor: string[] }) {

    const [items, setItems] = useState<{
        icon: string, header: string, description: string | number, options?: { value: string; label: string; }[], selectedOption: { value: string; label: string; }, selectOption?: React.Dispatch<React.SetStateAction<{
            value: string;
            label: string;
        }>>
    }[]>([])

    useEffect(() => {
        setSelectedCity({ label: city, value: '0' })

    }, [city])
    useEffect(() => {
        setSelectedCountry({ label: country, value: '0' })


    }, [country])
    useEffect(() => {
        setSelectedGender({ label: gender, value: '0' })


    }, [gender])

    const { cities, countries, genders, setSelectedCountry, selectedGender, selectedCity, selectedCountry, setSelectedGender, setSelectedCity } = useManageProfile()

    useEffect(() => {
        setItems(
            [{ icon: MailImg, header: 'Email', description: email },
            { icon: GlobImg, header: 'Country', description: country, options: countries, selectedOption: selectedCountry, selectOption: setSelectedCountry, },
            { icon: LocationImg, header: 'City', description: city, options: cities, selectedOption: selectedCity, selectOption: setSelectedCity, },
            { icon: AgeImg, header: 'Age', description: age, },
            { icon: GenderImg, header: 'Gender', description: gender, options: genders, selectedOption: selectedGender, selectOption: setSelectedGender, },
            { icon: StatusImg, header: 'Status', description: status, },
            { icon: PersonImg, header: 'About me', description: about, },
            { icon: PaintImg, header: "I'm looking for", description: lookingFor.join(', '), }
            ]

        )
    }, [about, age, cities, city, countries, country, email, gender, genders, lookingFor, selectedCity, selectedCountry, selectedGender, setSelectedCity, setSelectedCountry, setSelectedGender, status])

    return (
        <div className={styles.info_container}>
            {
                items.map(el => <div className={styles.info_container__row} key={el.header}>
                    <div className={styles.info_container__header}>
                        <img src={el.icon} alt={el.header} /><div>{el.header}</div>
                    </div>
                    {isEdit ? el.options ? <InputSelectColumns label={''} options={el.options} error={''} setSelectedOption={(option) => { if (el.selectOption) { el.selectOption(option) } }} selectedOption={el.selectedOption} onChange={(option) => { console.log(option) }} /> : <TextInputEdit data={el.description} setData={(value) => { console.log(value) }} placeholder={''} min={undefined} max={undefined} /> : <div className={styles.info_container__description}>{el.description}</div>
                    }
                </div>)
            }

        </div>

    )
}

export default UserInfoList;
