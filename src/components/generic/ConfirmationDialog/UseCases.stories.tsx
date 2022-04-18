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

export const Prop_Placeholder_ConfirmationDialog = Template.bind({})
Prop_Placeholder_ConfirmationDialog.storyName = 'Inside the Modal'
Prop_Placeholder_ConfirmationDialog.args = {
  ...Default_ConfirmationDialog.args
}
Prop_Placeholder_ConfirmationDialog.decorators = [story => (
  <Prop_DefaultWidth_false_Modal {...Prop_DefaultWidth_false_Modal.args} defaultWidth={false}>
    {story()}
  </Prop_DefaultWidth_false_Modal>
)]
