import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import ConfirmationDialog from './ConfirmationDialog'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof ConfirmationDialog>

const Template: ComponentStory<typeof ConfirmationDialog> = (args) => (
  <ConfirmationDialog {...args} />
)

export const NoProps_ConfirmationDialog = Template.bind({})
NoProps_ConfirmationDialog.storyName = 'No props'
NoProps_ConfirmationDialog.args = {}
NoProps_ConfirmationDialog.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('ConfirmationDialog')
  await expect(component).not.toBeInTheDocument()
}
