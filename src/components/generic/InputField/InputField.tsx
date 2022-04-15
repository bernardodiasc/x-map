import styles from './InputField.module.css'

interface Props extends React.InputHTMLAttributes<HTMLButtonElement> {
  invalid: boolean
  register: boolean
  prefix: string
}

const InputField = ({
  type = 'text',
  invalid,
  register,
  prefix,
  ...props
}: Props): JSX.Element => {
  const inputClassNames = [
    styles.input,
    prefix ? styles.withPrefix : '',
    invalid ? styles.invalid : '',
    props.disabled ? styles.disabled : '',
  ].join(' ')
  return (
    <div
      data-testid="InputField"
      className={styles.component}
    >
      {prefix && (
        <span className={styles.prefix}>{prefix}</span>
      )}
      <input
        type={type}
        className={inputClassNames}
        {...props}
        {...register}
      />
    </div>
  )
}

export default InputField
