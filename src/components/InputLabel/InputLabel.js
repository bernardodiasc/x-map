import * as styles from './InputLabel.module.css'

const InputLabel = ({ title, children }) => {
  return (
    <label className={styles.component}>
      {title && (
        <div className={styles.title}>{title}</div>
      )}
      {children}
    </label>
  )
}

export default InputLabel
