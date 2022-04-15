type Props = {
  children?: React.ReactNode,
}

const <%= componentName %> = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.component}>
      {children}
    </div>
  )
}

export default <%= componentName %>
