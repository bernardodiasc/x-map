import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Button from './Button'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const NoProps_Button = Template.bind({})
NoProps_Button.storyName = 'No props'
NoProps_Button.args = {}
NoProps_Button.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.queryByTestId('Button')
  await expect(button).not.toBeInTheDocument()
}
