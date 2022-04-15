import styles from './<%= componentName %>.module.css'

type Props = {
  onClick: () => void,
  label?: string,
}

const <%= componentName %> = ({
  onClick,
  label = 'ClickMe!'
}: Props): JSX.Element => {
  return onClick ? (
    <div
      data-testid="<%= componentName %>"
      className={styles.component}
    >
      <input data-testid="email" />
      <button
        data-testid="button"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  ) : null
}

export default <%= componentName %>
