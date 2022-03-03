import * as styles from './Form.module.css'

const Form = ({ title, description, onSubmit, errorMessage, className = '', children }) => {
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
      {errorMessage && (
        <p className={styles.error}>
          {errorMessage}
        </p>
      )}
    </form>
  )
}

export default Form
