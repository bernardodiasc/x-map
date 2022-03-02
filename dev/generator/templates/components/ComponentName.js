import * as styles from './<%= componentName %>.module.css'

const <%= componentName %> = ({ children }) => {
  return (
    <div className={styles.component}>
      {children}
    </div>
  )
}

export default <%= componentName %>
