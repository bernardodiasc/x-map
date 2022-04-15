import { ComponentStory, ComponentMeta } from '@storybook/react'
// import { within, userEvent } from '@storybook/testing-library'

import <%= componentName %> from './<%= componentName %>'

export default {
  title: '<%= componentName %>',
  component: <%= componentName %>,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ]
} as ComponentMeta<typeof <%= componentName %>>

const Template: ComponentStory<typeof <%= componentName %>> = (args) => <<%= componentName %> {...args} />

export const <%= componentName %>Story = Template.bind({})
<%= componentName %>Story.args = {}
<%= componentName %>Story.storyName = '<%= componentName %>'
// <%= componentName %>Story.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
//   await userEvent.type(
//     canvas.getByTestId('email'),
//     'email@provider.com',
//     { delay: 100 }
//   )
//   await userEvent.click(canvas.getByRole('button'))
// }
