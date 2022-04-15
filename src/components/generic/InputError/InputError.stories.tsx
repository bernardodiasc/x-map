import { ComponentStory, ComponentMeta } from '@storybook/react'
// import { within, userEvent } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'

import InputError from './InputError'

export default {
  title: 'Generic/InputError',
  component: InputError,
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
} as ComponentMeta<typeof InputError>

const Template: ComponentStory<typeof InputError> = (args) => (
  <InputError {...args} />
)

export const DefaultInputError = Template.bind({})
DefaultInputError.storyName = 'Demo'
DefaultInputError.args = {}
// DefaultInputError.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', { delay: 100 })
//   await userEvent.click(canvas.getByTestId('button'))
//   await expect(args.onClick).toHaveBeenCalled()
// }
