import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from './Modal'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
)

export const Prop_DefaultPadding_false_Modal = Template.bind({})
Prop_DefaultPadding_false_Modal.storyName = 'Prop: defaultPadding: false'
Prop_DefaultPadding_false_Modal.args = {
  defaultPadding: false,
}

export const Prop_DefaultWidth_false_Modal = Template.bind({})
Prop_DefaultWidth_false_Modal.storyName = 'Prop: defaultWidth: false'
Prop_DefaultWidth_false_Modal.args = {
  defaultWidth: false,
}

export const Props_DefaultPaddingAndDefaultWidth_Modal = Template.bind({})
Props_DefaultPaddingAndDefaultWidth_Modal.storyName = 'Props: defaultPadding and defaultWidth: false'
Props_DefaultPaddingAndDefaultWidth_Modal.args = {
  defaultPadding: false,
  defaultWidth: false,
}
