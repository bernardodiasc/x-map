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

export const Prop_Placeholder_<%= componentName %> = Template.bind({})
Prop_Placeholder_<%= componentName %>.storyName = 'Prop: placeholder'
Prop_Placeholder_<%= componentName %>.args = {
  onClick: action('onClick'),
  placeholder: 'Type your email'
}
