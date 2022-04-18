import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Button from './Button'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button
    onClick={action('Button onClick')}
    {...args}
  />
)

export const DefaultButton = Template.bind({})
DefaultButton.storyName = 'Demo'
DefaultButton.args = {
  onClick: action('Button onClick')
}
DefaultButton.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('button'))
  await expect(args.onClick).toHaveBeenCalled()
}
