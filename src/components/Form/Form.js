import * as styles from './Form.module.css'

const Form = ({
  title,
  description,
  onSubmit,
  successMessage,
  errorMessage,
  className = '',
  children,
  control,
}) => {
  const classNames = [
    styles.component,
    className,
  ].join(' ')
  return (
    <form className={classNames} onSubmit={onSubmit}>
      {title && (
        <h1 className={styles.title}>{title}</h1>
      )}

      {description && (
        <p>{description}</p>
      )}

      {children}

      {(successMessage || errorMessage) && (
        <div className={styles.messages}>
          {successMessage && (
            <p className={styles.success}>
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className={styles.error}>
              {errorMessage}
            </p>
          )}
        </div>
      )}

      {control && (
        <div className={styles.control}>
          {control}
        </div>
      )}
    </form>
  )
}

export default Form
