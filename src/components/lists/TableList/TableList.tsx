
import { useLocation, useNavigate } from 'react-router-dom';
import CheckBox from '../../inputs/Checkbox/Checkbox'
import styles from './TableList.module.scss'
function TableList({ data, setSelected, columns, isCheckbox }: { isCheckbox: boolean, setSelected?: React.Dispatch<React.SetStateAction<number[]>>, selected?: number[], data: { id: number, data: string[] }[], columns: string[] }) {

    const navigate = useNavigate()
    const location = useLocation(
    )

    const onItemClicked = (el: { id: any; }) => {
        if (location.pathname.includes('client')) { navigate(`/clients/${el.id}`) }
        if (location.pathname.includes('payment')) { navigate(`/payments/${el.id}`) }

    }



    return (
        <table className={styles.list_table}>
            <tr className={styles.list_table__head}>
                {isCheckbox ? <th >
                    <CheckBox />
                </th> : <th className={styles.list_table__empty}>kh.</th>}
                {columns.map(columnName => <th>{columnName}</th>)}

            </tr>

            {data.map(el => <tr key={el.id} className={styles.list_table__row}>
                {isCheckbox ? <td >
                    <CheckBox onChange={(isChecked) => {
                        setSelected(prev => isChecked ? [...prev, el.id] : prev.filter(ids => ids !== el.id))
                    }} />
                </td> : <>      </>}

                {el.data.map(infoItem => <td className={location.pathname.includes('admin') ? styles.admin : undefined} onClick={() => { onItemClicked(el) }}>{infoItem}</td>
                )}
            </tr>)}

        </table>

    )
}

export default TableList;
