
import CheckBox from '../../inputs/Checkbox/Checkbox'
import styles from './TableList.module.scss'
function TableList() {

    const items = [{ id: 1, name: 'Mark Zuckerberg ', email: 'Mark_Zuckerberg@gmail.com', country: 'USA', city: 'Kyiv', gender: 'Male', aboutMe: 'Hello I am', status: 'Gallery', looking: 'Gallery' },
    { id: 2, name: 'Mark Zuckerberg ', email: 'Mark_Zuckerberg@gmail.com', country: 'USA', city: 'Kyiv', gender: 'Male', aboutMe: 'Hello I am', status: 'Gallery', looking: 'Gallery' },
    { id: 3, name: 'Mark Zuckerberg ', email: 'Mark_Zuckerberg@gmail.com', country: 'USA', city: 'Kyiv', gender: 'Male', aboutMe: 'Hello I am', status: 'Gallery', looking: 'Gallery' }]

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


            {items.map(el => <tr key={el.id} className={styles.list_table__row}>
                <td >
                    <CheckBox />
                </td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.country}</td>
                <td>{el.city}</td>
                <td>{el.gender}</td>
                <td>{el.aboutMe}</td>
                <td>{el.status}</td>
                <td>{el.looking}</td>

            </tr>)}

        </table>

    )
}

export default TableList;
