import * as styles from './Button.module.css'

const Button = ({
  type = 'button',
  wide,
  link,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.component,
    wide ? styles.wide : '',
    link ? styles.link : '',
    className,
  ].join(' ')
  return (
    <button type={type} className={classNames} {...props} />
  )
}

export default Button
