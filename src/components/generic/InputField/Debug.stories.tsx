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

export const BlankStory = Template.bind({})
BlankStory.storyName = 'No props'
BlankStory.args = {}
BlankStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputField')
  await expect(component).toBeInTheDocument()
}

export const TooLongStory = Template.bind({})
TooLongStory.storyName = 'Too long'
TooLongStory.args = {
  defaultValue: new Array(100).fill('').map(() => 'Too long...').join(' ')
}
TooLongStory.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.queryByTestId('InputField-input') as HTMLInputElement
  await expect(input).toBeInTheDocument()
  await expect(input.value).toBe(args.defaultValue)
}
