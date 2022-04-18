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

export const Default_Button = Template.bind({})
Default_Button.storyName = 'Demo'
Default_Button.args = {
  onClick: action('Button onClick')
}
Default_Button.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Button')
  await expect(component).toBeInTheDocument()
  await userEvent.click(component)
  await expect(args.onClick).toHaveBeenCalled()
}
