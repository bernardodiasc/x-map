import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button
    onClick={action('Button onClick')}
    {...args}
  />
)

export const WideButton = Template.bind({})
WideButton.storyName = 'Wide style'
WideButton.args = { wide: true }

export const LinkButton = Template.bind({})
LinkButton.storyName = 'Link style'
LinkButton.args = { link: true }
