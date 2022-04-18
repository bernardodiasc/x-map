import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import <%= componentName %> from './<%= componentName %>'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Debug`,
} as ComponentMeta<typeof <%= componentName %>>

const Template: ComponentStory<typeof <%= componentName %>> = (args) => <<%= componentName %> {...args} />

export const BlankStory = Template.bind({})
BlankStory.storyName = 'No props'
BlankStory.args = {}
BlankStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('<%= componentName %>')
  await expect(component).not.toBeInTheDocument()
}
