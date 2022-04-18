import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputError from './InputError'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  argTypes: {
    children: {
      defaultValue: 'This is an error message!',
    },
  },
} as ComponentMeta<typeof InputError>

const Template: ComponentStory<typeof InputError> = (args) => (
  <InputError {...args} />
)

export const Default_InputError = Template.bind({})
Default_InputError.storyName = 'Demo'
Default_InputError.args = {
  hasError: true,
  children: 'This is an error message!',
}
Default_InputError.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputError')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.children)
}
