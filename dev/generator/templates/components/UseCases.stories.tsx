import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import <%= componentName %> from './<%= componentName %>'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof <%= componentName %>>

const Template: ComponentStory<typeof <%= componentName %>> = (args) => (
  <<%= componentName %>
    onClick={action('onClick')}
    {...args}
  />
)

export const WithPlaceholder_<%= componentName %> = Template.bind({})
WithPlaceholder_<%= componentName %>.storyName = 'With placeholder'
WithPlaceholder_<%= componentName %>.args = {
  onClick: action('onClick'),
  placeholder: 'Type your email'
}
