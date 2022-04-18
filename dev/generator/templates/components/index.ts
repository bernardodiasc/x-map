import <%= componentName %> from './<%= componentName %>'

export default <%= componentName %>

export const storiesConfig = {
  title: '<% if (parentComponent) { %><%= parentComponent.replace(/\w/, c => c.toUpperCase()) %>/<%= componentName %><% } else { %><%= componentName %><% } %>',
  component: <%= componentName %>,
  argTypes: {
    onClick: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onClick',
    }
  },
}
