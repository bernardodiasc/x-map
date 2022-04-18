import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Modal from './Modal'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
)

export const NoProps_Modal = Template.bind({})
NoProps_Modal.storyName = 'No props'
NoProps_Modal.args = {
  children: undefined,
}
NoProps_Modal.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Modal')
  await expect(component).not.toBeInTheDocument()
}
