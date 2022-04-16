import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Button from './Button'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button
    onClick={action('Button onClick')}
    {...args}
  />
)

export const Prop_Wide_Button = Template.bind({})
Prop_Wide_Button.storyName = 'Prop: wide'
Prop_Wide_Button.args = { wide: true }

export const Prop_Link_Button = Template.bind({})
Prop_Link_Button.storyName = 'Prop: link'
Prop_Link_Button.args = { link: true }

export const Prop_Disabled_Button = Template.bind({})
Prop_Disabled_Button.storyName = 'Prop: disabled'
Prop_Disabled_Button.args = { disabled: true, onClick: action('Button onClick') }
Prop_Disabled_Button.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('button'))
  await expect(args.onClick).not.toHaveBeenCalled()
}
