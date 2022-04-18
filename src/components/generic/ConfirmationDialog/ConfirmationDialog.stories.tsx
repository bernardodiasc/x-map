import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import ConfirmationDialog from './ConfirmationDialog'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof ConfirmationDialog>

const Template: ComponentStory<typeof ConfirmationDialog> = (args) => (
  <ConfirmationDialog {...args} />
)

export const Default_ConfirmationDialog = Template.bind({})
Default_ConfirmationDialog.storyName = 'Demo'
Default_ConfirmationDialog.args = {
  title: 'This is the title',
  message: 'This is the message',
  onCancel: action('onCancel'),
  onConfirm: action('onConfirm'),
}
Default_ConfirmationDialog.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('ConfirmationDialog')
  await expect(component).toBeInTheDocument()
  const onCancel = canvas.queryByTestId('ConfirmationDialog-onCancel')
  await userEvent.click(onCancel)
  await expect(args.onCancel).toHaveBeenCalled()
  const onConfirm = canvas.queryByTestId('ConfirmationDialog-onConfirm')
  await userEvent.click(onConfirm)
  await expect(args.onConfirm).toHaveBeenCalled()
}
