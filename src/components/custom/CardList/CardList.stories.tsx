import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import CardList from './CardList'
import { ProfileCard_CardList } from './UseCases.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof CardList>

const Template: ComponentStory<typeof CardList> = () => (
  <ProfileCard_CardList {...ProfileCard_CardList.args} />
)

export const Default_CardList = Template.bind({})
Default_CardList.storyName = 'Demo'
Default_CardList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('CardList')
  await expect(component).toBeInTheDocument()
}
