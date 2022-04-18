import { ComponentStory, ComponentMeta } from '@storybook/react'

import Loading from './Loading'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
)

export const Default_Loading = Template.bind({})
Default_Loading.storyName = 'Demo'
Default_Loading.args = {}
