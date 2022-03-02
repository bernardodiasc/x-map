import * as styles from './InputError.module.css'

const InputError = ({ hasError, children }) => {
  return hasError ? (
    <div className={styles.component}>
      {children}
    </div>
  ) : null
}

export default InputError
