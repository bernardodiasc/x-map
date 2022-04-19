import { ComponentStory, ComponentMeta } from '@storybook/react'

import CardList from './CardList'
import { Default_ProfileCard } from '@components/custom/ProfileCard/ProfileCard.stories'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof CardList>

const Template: ComponentStory<typeof CardList> = (args) => (
  <CardList {...args} />
)

export const ProfileCard_CardList = Template.bind({})
ProfileCard_CardList.storyName = 'With ProfileCard'
ProfileCard_CardList.args = {
  Card: ({ item }) => item,
  title: 'This is the title',
  data: [
    <Default_ProfileCard key="1" {...Default_ProfileCard.args} />,
    <Default_ProfileCard key="2" {...Default_ProfileCard.args} />,
    <Default_ProfileCard key="3" {...Default_ProfileCard.args} />,
    <Default_ProfileCard key="4" {...Default_ProfileCard.args} />,
    <Default_ProfileCard key="5" {...Default_ProfileCard.args} />,
    <Default_ProfileCard key="6" {...Default_ProfileCard.args} />,
  ],
}

export const EventCard_CardList = Template.bind({})
EventCard_CardList.storyName = 'With EventCard'
EventCard_CardList.args = {
  Card: ({ item }) => item,
  title: 'This is the title',
  data: ['Testing...', 'Testing...', 'Testing...', 'Testing...'],
}

export const EventLocationCard_CardList = Template.bind({})
EventLocationCard_CardList.storyName = 'With EventLocationCard'
EventLocationCard_CardList.args = {
  Card: ({ item }) => item,
  title: 'This is the title',
  data: ['Testing...', 'Testing...', 'Testing...', 'Testing...'],
}
