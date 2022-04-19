import { ComponentStory, ComponentMeta } from '@storybook/react'

import ConfirmationDialog from './ConfirmationDialog'
import { Default_ConfirmationDialog } from './ConfirmationDialog.stories'
import { Prop_DefaultWidth_false_Modal } from '@components/generic/Modal/UseCases.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof ConfirmationDialog>

const Template: ComponentStory<typeof ConfirmationDialog> = (args) => (
  <Default_ConfirmationDialog {...args} />
)

export const InsideModal_ConfirmationDialog = Template.bind({})
InsideModal_ConfirmationDialog.storyName = 'Inside the Modal'
InsideModal_ConfirmationDialog.args = {
  ...Default_ConfirmationDialog.args
}
InsideModal_ConfirmationDialog.decorators = [story => (
  <Prop_DefaultWidth_false_Modal {...Prop_DefaultWidth_false_Modal.args} defaultWidth={false}>
    {story()}
  </Prop_DefaultWidth_false_Modal>
)]
