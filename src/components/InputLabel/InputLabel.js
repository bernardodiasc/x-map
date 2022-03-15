import * as styles from './InputLabel.module.css'

const InputLabel = ({ title, isRequired, children }) => {
  return (
    <label className={styles.component}>
      {title && (
        <div className={styles.title}>
          {title}
          {isRequired && <span className={styles.required}>*</span>}
        </div>
      )}
      {children}
    </label>
  )
}

export default InputLabel
