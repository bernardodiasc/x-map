import { ComponentStory, ComponentMeta } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { expect } from '@storybook/jest'
// import { within, userEvent } from '@storybook/testing-library'

import <%= componentName %> from './<%= componentName %>'

export default {
  title: '<%= componentPath %>',
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
<%= componentName %>Story.storyName = '<%= componentName %>'
<%= componentName %>Story.args = {
  // onClick: action('button-click')
}
// https://testing-library.com/
// https://storybook.js.org/docs/react/writing-tests/interaction-testing#api-for-user-events
// <%= componentName %>Story.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   await userEvent.type(
//     canvas.getByTestId('email'),
//     'email@provider.com',
//     { delay: 100 }
//   )
//   await userEvent.click(canvas.getByRole('button'))
//   await expect(args.onClick).toHaveBeenCalled()
// }
