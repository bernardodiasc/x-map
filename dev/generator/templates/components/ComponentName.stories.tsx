import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import <%= componentName %> from './<%= componentName %>'

export default {
  title: '<% if (parentComponent) { %><%= parentComponent.replace(/\w/, c => c.toUpperCase()) %>/<%= componentName %><% } else { %><%= componentName %><% } %>/Demos',
  component: <%= componentName %>,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: true },
  },
  parameters: {
    controls: {
      exclude: 'onClick',
    }
  },
} as ComponentMeta<typeof <%= componentName %>>

const Template: ComponentStory<typeof <%= componentName %>> = (args) => (
  <<%= componentName %> {...args} />
)

export const Default<%= componentName %> = Template.bind({})
Default<%= componentName %>.storyName = 'default'
Default<%= componentName %>.args = {}
Default<%= componentName %>.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', { delay: 100 })
  await userEvent.click(canvas.getByTestId('button'))
  await expect(args.onClick).toHaveBeenCalled()
}
