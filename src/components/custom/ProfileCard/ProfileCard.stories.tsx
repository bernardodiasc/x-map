import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import ProfileCard from './ProfileCard'

import { storiesConfig } from '.'

export default {
  ...storiesConfig
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

export const Default_ProfileCard = Template.bind({})
Default_ProfileCard.storyName = 'Demo'
Default_ProfileCard.args = {
  item: {
    id: 1,
    name: 'This is the name',
    email: 'This is the email',
    about: 'This is the about',
    website: 'This is the website',
    github: 'This is the github',
    stackoverflow: 'This is the stackoverflow',
    linkedin: 'This is the linkedin',
    twitter: 'This is the twitter',
    instagram: 'This is the instagram',
    locations: {
      id: 1,
      address: 'This is the address',
      city: 'This is the city',
      country: 'This is the country',
      timezone: 'This is the timezone',
      latitude: '23',
      longitude: '46',
      start: '2022-04-19',
      end: '2023-04-19',
      coordinates: [
        23,
        46,
      ],
      title: 'This is the title',
      description: 'This is the description',
    },
    // TO DO: fix image loading on storybook
    // avatar: {
    //   id: 5,
    //   url: '/static/avatar.png',
    //   width: 100,
    //   height: 100,
    //   alt: 'Profile\'s avatar'
    // },
  }
}
Default_ProfileCard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const component = canvas.queryByTestId('ProfileCard')
  await expect(component).toBeInTheDocument()
}
