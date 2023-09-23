import { UsePaginationItem } from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import styles from './ListPagination.module.scss'
import NextImage from '../../../images/icons/next.svg'

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
});

export default function UsePagination({ items }: { items: UsePaginationItem[] }) {


    return (
        <nav className={styles.pagination_container}>
            <List>
                {items.map(({ page, type, selected, disabled, ...item }, index) => {
                    let children = null;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = <p>...</p>
                    } else if (type === 'page') {
                        children = (
                            <button
                                type="button"
                                className={selected ? styles.pagination__active_page : styles.pagination__page}

                                {...item}
                            >
                                <div>{page}</div>
                            </button>
                        );
                    } else {
                        children = (
                            <button disabled={disabled?true:false} className={styles.pagination__next} type="button" {...item}>
                                <img className={disabled ? styles.pagination_disabled : styles.pagination__next_img} src={NextImage} alt='type' />
                            </button>
                        );
                    }

                    return <li key={index}  > {children}</li>;
                })}
            </List>
        </nav >
    );
}