import * as styles from './Button.module.css'

const Button = ({ wide, link, className = '', ...props }) => {
  const classNames = [
    styles.component,
    wide ? styles.wide : '',
    link ? styles.link : '',
    className,
  ].join(' ')
  return (
    <button className={classNames} {...props} />
  )
}

export default Button
