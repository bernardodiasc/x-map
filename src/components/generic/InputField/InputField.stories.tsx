import { ComponentStory, ComponentMeta } from '@storybook/react'
// import { within, userEvent } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'

import InputField from './InputField'

export default {
  title: 'Generic/InputField',
  component: InputField,
  // decorators: [
  //   (Story) => (
  //     <div style={{ margin: '3em' }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
  // argTypes: {
  //   onClick: { action: true },
  // },
  // parameters: {
  //   controls: {
  //     exclude: 'onClick',
  //   }
  // },
} as ComponentMeta<typeof InputField>

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
)

export const DefaultInputField = Template.bind({})
DefaultInputField.storyName = 'Demo'
DefaultInputField.args = {}
// DefaultInputField.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', { delay: 100 })
//   await userEvent.click(canvas.getByTestId('button'))
//   await expect(args.onClick).toHaveBeenCalled()
// }
