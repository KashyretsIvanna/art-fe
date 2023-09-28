
import { useNavigate } from 'react-router-dom';
import { UserListItemRes } from '../../../store/types/user/user-list.dto';
import CheckBox from '../../inputs/Checkbox/Checkbox'
import styles from './TableList.module.scss'
function TableList({ data }: { data: UserListItemRes[] }) {

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


            {data.map(el => <tr onClick={() => { navigate(`/clients/${el.id}`) }} key={el.id} className={styles.list_table__row}>
                <td >
                    <CheckBox />
                </td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.country}</td>
                <td>{el.city}</td>
                <td>{el.gender}</td>
                <td>{el.aboutMe}</td>
                <td>{el.plan}</td>
                <td>{el.isLookingForArtist ? 'Artist' : 'Gallery'}</td>

            </tr>)}

        </table>

    )
}

export default TableList;
