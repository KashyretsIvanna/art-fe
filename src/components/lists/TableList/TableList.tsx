
import { useNavigate } from 'react-router-dom';
import { UserListItemRes } from '../../../store/types/user/user-list.dto';
import CheckBox from '../../inputs/Checkbox/Checkbox'
import styles from './TableList.module.scss'
function TableList({ data, setSelected }: { setSelected: React.Dispatch<React.SetStateAction<number[]>>, selected: number[], data: UserListItemRes[] }) {

    const navigate = useNavigate()




    return (
        <table className={styles.list_table}>
            <tr className={styles.list_table__head}>
                <th >
                    <CheckBox />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>City</th>
                <th>Gender</th>
                <th>About me </th>
                <th>Status</th>
                <th>I'm looking for</th>
            </tr>




            {data.map(el => <tr key={el.id} className={styles.list_table__row}>
                <td >
                    <CheckBox onChange={(isChecked) => {
                        setSelected(prev => isChecked ? [...prev, el.id] : prev.filter(ids => ids !== el.id))
                    }} />
                </td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.name}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.email}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.country}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.city}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.gender}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.aboutMe}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.plan}</td>
                <td onClick={() => { navigate(`/clients/${el.id}`) }}>{el.isLookingForArtist ? 'Artist' : 'Gallery'}</td>

            </tr>)}

        </table>

    )
}

export default TableList;
