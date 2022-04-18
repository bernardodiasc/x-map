import ConfirmationDialog from './ConfirmationDialog'

export default ConfirmationDialog

export const storiesConfig = {
  title: 'Generic/ConfirmationDialog',
  component: ConfirmationDialog,
  argTypes: {
    onCancel: { action: true },
    onConfirm: { action: true },
  },
  parameters: {
    controls: {
      exclude: ['onCancel', 'onConfirm'],
    }
  },
}
