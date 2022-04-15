import styles from './Button.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  wide: boolean
  link: boolean
  className: string
  onClick: () => void
  children: React.ReactNode
}

const Button = ({
  type = 'button',
  wide = false,
  link = false,
  className = '',
  onClick,
  children,
  ...props
}: Props): JSX.Element => {
  const classNames = [
    styles.component,
    wide ? styles.wide : '',
    link ? styles.link : '',
    className,
  ].join(' ')
  return children && onClick ? (
    <button
      data-testid="button"
      type={type}
      className={classNames}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ) : null
}

export default Button
