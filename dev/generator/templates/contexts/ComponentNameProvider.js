import <%= componentName %>Context from './<%= componentName %>Context'

const <%= componentName %>Provider = ({ children, ...props }) => {
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
