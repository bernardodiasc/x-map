import styles from './InputLabel.module.css'

type Props = {
  title?: string,
  isRequired?: boolean,
  children?: React.ReactNode,
}

const InputLabel = ({
  title,
  isRequired,
  children
}: Props): JSX.Element => {
  if (!title && !children) {
    return null
  }

  return (
    <label
      data-testid="InputLabel"
      className={styles.component}
    >
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
