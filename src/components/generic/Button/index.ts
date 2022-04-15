import Button from './Button'

export default Button

export const storiesConfig = {
  title: 'Generic/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['submit', 'reset', 'button'],
      control: { type: 'select' },
      defaultValue: 'button',
    },
    wide: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    link: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'This is a button',
    },
    onClick: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onClick',
    }
  },
}
