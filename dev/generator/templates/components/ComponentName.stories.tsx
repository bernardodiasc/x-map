import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import <%= componentName %> from './<%= componentName %>'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof <%= componentName %>>

const Template: ComponentStory<typeof <%= componentName %>> = (args) => (
  <<%= componentName %>
    onClick={action('onClick')}
    {...args}
  />
)

export const Default_<%= componentName %> = Template.bind({})
Default_<%= componentName %>.storyName = 'Demo'
Default_<%= componentName %>.args = {
  onClick: action('onClick')
}
Default_<%= componentName %>.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('<%= componentName %>')
  await expect(component).toBeInTheDocument()
  await userEvent.type(canvas.queryByTestId('email'), 'email@provider.com', { delay: 100 })
  await userEvent.click(canvas.queryByTestId('button'))
  await expect(args.onClick).toHaveBeenCalled()
}
