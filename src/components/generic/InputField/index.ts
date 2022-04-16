import InputField from './InputField'

export default InputField

export const storiesConfig = {
  title: 'Generic/InputField',
  component: InputField,
  argTypes: {
    defaultValue: {
      type: 'string',
    },
    type: {
      options: ['button', 'checkbox', 'color', 'date', 'datetime', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'],
      control: { type: 'select' },
    }
  },
  parameters: {
    controls: {
      exclude: 'register',
    }
  },
}
