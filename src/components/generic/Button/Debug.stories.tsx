import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Button from './Button'

export default {
  title: 'Generic/Button/Debug',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const BlankStory = Template.bind({})
BlankStory.storyName = 'No props'
BlankStory.args = {}
BlankStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.queryByTestId('button')
  await expect(button).not.toBeInTheDocument()
}
