import styles from './SectionLine.module.scss'


function SectionLine({ width, color }: { width?: string, color?: string }) {


    return (
        <div style={{ width, backgroundColor: color }} className={styles.section_line}>
        </div>


    )
}

export default SectionLine;
