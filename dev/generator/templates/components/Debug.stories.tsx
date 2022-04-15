import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import <%= componentName %> from './<%= componentName %>'

export default {
  title: '<% if (parentComponent) { %><%= parentComponent.replace(/\w/, c => c.toUpperCase()) %>/<%= componentName %><% } else { %><%= componentName %><% } %>/Debug',
  component: <%= componentName %>
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
