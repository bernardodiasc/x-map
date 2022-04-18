import styles from './<%= componentName %>.module.css'

type Props = {
  onClick: () => void,
  label?: string,
  placeholder?: string,
}

const <%= componentName %> = ({
  onClick,
  label = 'ClickMe!',
  placeholder,
}: Props): JSX.Element => {
  if (!onClick) {
    return null
  }

  return (
    <div
      data-testid="<%= componentName %>"
      className={styles.component}
    >
      <input data-testid="email" placeholder={placeholder} />
      <button
        data-testid="button"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}

export default <%= componentName %>
