import { RegisterOptions } from 'react-hook-form'

import styles from './InputField.module.css'

type Props = {
  type?: 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'
  invalid?: boolean,
  register?: RegisterOptions,
  prefix?: string,
  disabled?: boolean,
}

const InputField = ({
  type = 'text',
  invalid,
  register,
  prefix,
  disabled,
  ...props
}: Props): JSX.Element => {
  const inputClassNames = [
    styles.input,
    prefix ? styles.withPrefix : '',
    invalid ? styles.invalid : '',
    disabled ? styles.disabled : '',
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
      {/* @ts-ignore */}
      <input
        data-testid="InputField-input"
        type={type}
        className={inputClassNames}
        disabled={disabled}
        {...props}
        {...register}
      />
    </div>
  )
}

export default InputField
