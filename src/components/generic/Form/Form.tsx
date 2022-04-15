import styles from './Form.module.css'

type Props = {
  title?: string,
  description?: string,
  onSubmit: () => void,
  successMessage?: string,
  errorMessage?: string,
  className?: string,
  children: React.ReactNode,
  control?: React.ReactNode,
}

const Form = ({
  title,
  description,
  onSubmit,
  successMessage,
  errorMessage,
  className = '',
  children,
  control,
}: Props): JSX.Element => {
  const classNames = [
    styles.component,
    className,
  ].join(' ')

  if (!onSubmit || !children) {
    return null
  }

  return (
    <form
      data-testid="Form"
      className={classNames}
      onSubmit={onSubmit}
    >
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
