import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Form from './Form'

export default {
  title: 'Generic/Form/Demos',
  component: Form,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: true },
  }
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => (
  <Form {...args} />
)

export const DefaultForm = Template.bind({})
DefaultForm.storyName = 'Default'
DefaultForm.args = {}
DefaultForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', { delay: 100 })
  await userEvent.click(canvas.getByTestId('button'))
  await expect(args.onClick).toHaveBeenCalled()
}
