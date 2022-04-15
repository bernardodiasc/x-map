import styles from './Filters.module.css'

type Props = {
  onClick: () => void,
  label: string,
}

const Filters = ({ onClick, label = 'ClickMe!' }: Props): JSX.Element => {
  return (
    <div className={styles.component}>
      <input data-testid="email" />
      <button onClick={onClick}>{label}</button>
    </div>
  )
}

export default Filters
