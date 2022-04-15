import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import Form from './Form'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => (
  <Form
    onSubmit={action('Form onSubmit')}
    {...args}
  >
    This is a Form!
  </Form>
)

export const DefaultForm = Template.bind({})
DefaultForm.storyName = 'Demo'
DefaultForm.args = {}
DefaultForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('Form')
  await expect(component).toBeInTheDocument()
  // await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', { delay: 100 })
  // await userEvent.click(canvas.getByTestId('button'))
  // await expect(args.onClick).toHaveBeenCalled()
}
