import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { within } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'

import Modal from './Modal'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal
    onClose={action('onClose')}
    {...args}
  />
)

export const Default_Modal = Template.bind({})
Default_Modal.storyName = 'Demo'
Default_Modal.args = {
  onClose: action('onClose'),
}
// TO DO: find a way to properly test components with createPortal
// Default_Modal.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
//   const component = canvas.queryByTestId('Modal')
//   await expect(component).toBeInTheDocument()
//   await expect(canvas).toContainElement(component)
//   await expect(component).toHaveTextContent('lorem ipsum')
// }
