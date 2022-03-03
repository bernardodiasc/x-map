import * as styles from './Button.module.css'

const Button = ({ wide, link, ...props }) => {
  const classNames = [
    styles.component,
    wide ? styles.wide : '',
    link ? styles.link : '',
  ].join(' ')
  return (
    <button className={classNames} {...props} />
  )
}

export default Button
