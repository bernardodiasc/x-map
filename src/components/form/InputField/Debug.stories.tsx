import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputField from './InputField'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof InputField>

const Template: ComponentStory<typeof InputField> = (args) => <InputField {...args} />

export const NoProps_InputField = Template.bind({})
NoProps_InputField.storyName = 'No props'
NoProps_InputField.args = {}
NoProps_InputField.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputField')
  await expect(component).toBeInTheDocument()
}

export const TooLong_defaultValue_InputField = Template.bind({})
TooLong_defaultValue_InputField.storyName = 'Too long: value'
TooLong_defaultValue_InputField.args = {
  defaultValue: new Array(100).fill('').map(() => 'Too long...').join(' ')
}
TooLong_defaultValue_InputField.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.queryByTestId('InputField-input') as HTMLInputElement
  await expect(input).toBeInTheDocument()
  await expect(input.value).toBe(args.defaultValue)
}

export const TooLong_prefix_InputField = Template.bind({})
TooLong_prefix_InputField.storyName = 'Too long: prefix (with white space)'
TooLong_prefix_InputField.args = {
  prefix: new Array(100).fill('').map(() => 'Too long...').join(' ')
}
TooLong_prefix_InputField.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputField-prefix')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.prefix)
}

export const TooLongOneLine_prefix_InputField = Template.bind({})
TooLongOneLine_prefix_InputField.storyName = 'Too long: prefix (without white space)'
TooLongOneLine_prefix_InputField.args = {
  prefix: new Array(100).fill('').map(() => 'TooLong').join('')
}
TooLongOneLine_prefix_InputField.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputField-prefix')
  await expect(component).toBeInTheDocument()
  await expect(component).toHaveTextContent(args.prefix)
}
