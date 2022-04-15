import Form from './Form'

export default Form

export const storiesConfig = {
  title: 'Generic/Form',
  component: Form,
  argTypes: {
    onSubmit: { action: true },
    children: {
      defaultValue: 'This is a Form!'
    }
  },
  parameters: {
    controls: {
      exclude: ['children', 'onSubmit', 'control'],
    }
  },
}
