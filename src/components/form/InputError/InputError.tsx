import styles from './InputError.module.css'

type Props = {
  hasError?: boolean,
  children?: React.ReactNode,
}

const InputError = ({
  hasError,
  children,
}: Props): JSX.Element => {
  if (!hasError || !children) {
    return null
  }

  return (
    <div
      data-testid="InputError"
      className={styles.component}
    >
      {children}
    </div>
  )
}

export default InputError
