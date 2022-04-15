import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Button from './Button'

export default {
  title: 'Generic/Button/Demos',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      options: ['submit', 'reset', 'button'],
      control: { type: 'select' },
      defaultValue: 'button',
    },
    wide: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    link: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'This is a button',
    },
    onClick: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onClick',
    }
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
)

export const DefaultButton = Template.bind({})
DefaultButton.storyName = 'Default'
DefaultButton.args = {}
DefaultButton.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('button'))
  await expect(args.onClick).toHaveBeenCalled()
}

export const WideButton = Template.bind({})
WideButton.storyName = 'Style: wide'
WideButton.args = { wide: true }

export const LinkButton = Template.bind({})
LinkButton.storyName = 'Style: link'
LinkButton.args = { link: true }
