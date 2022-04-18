import Form from './Form'

export default Form

export const storiesConfig = {
  title: 'Form/Form',
  component: Form,
  argTypes: {
    onSubmit: { action: true },
  },
  parameters: {
    controls: {
      exclude: ['children', 'onSubmit', 'control'],
    }
  },
}
