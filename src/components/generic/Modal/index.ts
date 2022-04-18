import Modal from './Modal'

export default Modal

export const storiesConfig = {
  title: 'Generic/Modal',
  component: Modal,
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'This is the modal content',
    },
    onClose: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onClose',
    }
  },
}
