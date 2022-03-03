import * as styles from './Button.module.css'

const Button = ({ wide, ...props }) => {
  const classNames = [
    styles.component,
    wide ? styles.wide : ''
  ].join(' ')
  return (
    <button className={classNames} {...props} />
  )
}

export default Button
