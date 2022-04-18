import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import InputError from './InputError'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
  argTypes: {
    children: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof InputError>

const Template: ComponentStory<typeof InputError> = (args) => <InputError {...args} />

export const BlankStory = Template.bind({})
BlankStory.storyName = 'No props'
BlankStory.args = {}
BlankStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('InputError')
  await expect(component).not.toBeInTheDocument()
}
