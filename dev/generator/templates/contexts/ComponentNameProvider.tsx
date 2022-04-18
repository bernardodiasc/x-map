import <%= componentName %>Context from './<%= componentName %>Context'

type Props = {
  children?: React.ReactNode,
}

const <%= componentName %>Provider = ({ children, ...props }: Props): JSX.Element => {
  return (
    <<%= componentName %>Context.Provider
      value={{
        ...props
      }}
    >
      {children}
    </<%= componentName %>Context.Provider>
  )
}

export default <%= componentName %>Provider
