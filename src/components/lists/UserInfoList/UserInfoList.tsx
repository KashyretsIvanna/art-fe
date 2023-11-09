import styles from './UserInfoList.module.scss'

import InputSelectColumns from '../../inputs/InputSelectColumns/InputSelectColumns'
import TextInputEdit from '../../inputs/TextInputEdit/TextInputEdit'

function UserInfoList({ items, isEdit }: {
    items: {
        icon: string;
        header: string;
        options?: {
            value: string;
            label: string;
        }[] | undefined;
        selectedOption: {
            value: string;
            label: string;
        } | string | number;
        selectOption?: React.Dispatch<React.SetStateAction<string | number | {
            value: string;
            label: string;
        }>> | undefined;
        isEditable: boolean
    }[], isEdit: boolean
}) {




    return (
        <div className={styles.info_container}>
            {
                items.map(el => <div className={styles.info_container__row} key={el.header}>
                    <div className={styles.info_container__header}>
                        <img src={el.icon} alt={el.header} /><div>{el.header}</div>
                    </div>
                    {isEdit && el.isEditable ? el.options ? <InputSelectColumns label={''} options={el.options} error={''} setSelectedOption={(option) => { if (el.selectOption) { el.selectOption(option) } }} selectedOption={el.selectedOption} onChange={(option) => { }} /> : <TextInputEdit data={el.selectedOption as string} setData={(value) => { el.selectOption(value); }} placeholder={''} min={undefined} max={undefined} error={''} /> : <div className={styles.info_container__description}>{el.selectedOption ? typeof el.selectedOption !== 'string' ? el.selectedOption.label : el.selectedOption : ''}</div>
                    }
                </div>)
            }

        </div>

    )
}

export default UserInfoList;
