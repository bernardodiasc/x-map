import { RegisterOptions } from 'react-hook-form'

import styles from './InputField.module.css'

interface Props extends HTMLInputElement {
  invalid?: boolean
  register?: RegisterOptions
  prefix?: string
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
        <span
          data-testid="InputField-prefix"
          className={styles.prefix}
        >
          {prefix}
        </span>
      )}
      <input
        data-testid="InputField-input"
        type={type}
        className={inputClassNames}
        {...props}
        {...register}
      />
    </div>
  )
}

export default InputField
