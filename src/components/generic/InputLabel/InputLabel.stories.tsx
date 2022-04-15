import { ComponentStory, ComponentMeta } from '@storybook/react'
// import { within, userEvent } from '@storybook/testing-library'
// import { expect } from '@storybook/jest'

import InputLabel from './InputLabel'

export default {
  title: 'Generic/InputLabel',
  component: InputLabel,
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
} as ComponentMeta<typeof InputLabel>

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
)

export const DefaultInputLabel = Template.bind({})
DefaultInputLabel.storyName = 'Demo'
DefaultInputLabel.args = {}
// DefaultInputLabel.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   await userEvent.type(canvas.getByTestId('email'), 'email@provider.com', { delay: 100 })
//   await userEvent.click(canvas.getByTestId('button'))
//   await expect(args.onClick).toHaveBeenCalled()
// }
