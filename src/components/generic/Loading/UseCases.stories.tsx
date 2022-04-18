import { ComponentStory, ComponentMeta } from '@storybook/react'

import Loading from './Loading'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
)

export const Prop_InModal_Loading = Template.bind({})
Prop_InModal_Loading.storyName = 'Prop: inModal'
Prop_InModal_Loading.args = {
  inModal: true
}
