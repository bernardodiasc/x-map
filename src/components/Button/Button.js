import * as styles from './Button.module.css'

const Button = props => {
  const classNames = [
    styles.component,
    props.wide ? styles.wide : ''
  ].join(' ')
  return (
    <button className={classNames} {...props} />
  )
}

export default Button
