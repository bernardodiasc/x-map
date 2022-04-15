import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'

import Filters from './Filters'

export default {
  title: 'Filters',
  component: Filters,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Filters>

const Template: ComponentStory<typeof Filters> = (args) => <Filters {...args} />

export const FiltersStory = Template.bind({})
FiltersStory.storyName = 'Filters'
FiltersStory.args = {
  onClick: action('button-click')
}
FiltersStory.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(
    canvas.getByTestId('email'),
    'email@provider.com',
    { delay: 100 }
  )
  await userEvent.click(canvas.getByRole('button'))
  await expect(args.onClick).toHaveBeenCalled()
}
