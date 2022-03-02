import * as styles from './InputField.module.css'

const InputField = ({ register, ...props }) => {
  return (
    <input className={styles.component} {...props} {...register} />
  )
}

export default InputField
