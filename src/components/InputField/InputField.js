import * as styles from './InputField.module.css'

const InputField = ({ type = 'text', invalid, register, prefix, ...props }) => {
  const inputClassNames = [
    styles.input,
    prefix ? styles.withPrefix : '',
    invalid ? styles.invalid : '',
    props.disabled ? styles.disabled : '',
  ].join(' ')
  return (
    <div className={styles.component}>
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
