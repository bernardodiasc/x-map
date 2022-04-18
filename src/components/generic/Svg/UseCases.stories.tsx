import { ComponentStory, ComponentMeta } from '@storybook/react'

import Svg from './Svg'

import { storiesConfig } from '.'

export default {
  ...storiesConfig,
  title: `${storiesConfig.title}/Use Cases`,
} as ComponentMeta<typeof Svg>

const Template: ComponentStory<typeof Svg> = (args) => (
  <Svg
    width="46"
    height="46"
    {...args}
  />
)

export const Prop_Name_xteam_Svg = Template.bind({})
Prop_Name_xteam_Svg.storyName = 'Prop: name: xteam'
Prop_Name_xteam_Svg.args = {
  name: 'xteam',
  width: '109',
  height: '46',
}

export const Prop_Name_map_Svg = Template.bind({})
Prop_Name_map_Svg.storyName = 'Prop: name: map'
Prop_Name_map_Svg.args = {
  name: 'map'
}

export const Prop_Name_avatar_Svg = Template.bind({})
Prop_Name_avatar_Svg.storyName = 'Prop: name: avatar'
Prop_Name_avatar_Svg.args = {
  name: 'avatar'
}

export const Prop_Name_marker_Svg = Template.bind({})
Prop_Name_marker_Svg.storyName = 'Prop: name: marker'
Prop_Name_marker_Svg.args = {
  name: 'marker'
}

export const Prop_Name_website_Svg = Template.bind({})
Prop_Name_website_Svg.storyName = 'Prop: name: website'
Prop_Name_website_Svg.args = {
  name: 'website'
}

export const Prop_Name_github_Svg = Template.bind({})
Prop_Name_github_Svg.storyName = 'Prop: name: github'
Prop_Name_github_Svg.args = {
  name: 'github'
}

export const Prop_Name_stackoverflow_Svg = Template.bind({})
Prop_Name_stackoverflow_Svg.storyName = 'Prop: name: stackoverflow'
Prop_Name_stackoverflow_Svg.args = {
  name: 'stackoverflow'
}

export const Prop_Name_linkedin_Svg = Template.bind({})
Prop_Name_linkedin_Svg.storyName = 'Prop: name: linkedin'
Prop_Name_linkedin_Svg.args = {
  name: 'linkedin'
}

export const Prop_Name_twitter_Svg = Template.bind({})
Prop_Name_twitter_Svg.storyName = 'Prop: name: twitter'
Prop_Name_twitter_Svg.args = {
  name: 'twitter'
}

export const Prop_Name_instagram_Svg = Template.bind({})
Prop_Name_instagram_Svg.storyName = 'Prop: name: instagram'
Prop_Name_instagram_Svg.args = {
  name: 'instagram'
}

export const Prop_Name_x_Svg = Template.bind({})
Prop_Name_x_Svg.storyName = 'Prop: name: x'
Prop_Name_x_Svg.args = {
  name: 'x'
}

export const Prop_Name_ticket_Svg = Template.bind({})
Prop_Name_ticket_Svg.storyName = 'Prop: name: ticket'
Prop_Name_ticket_Svg.args = {
  name: 'ticket'
}

export const Prop_Name_calendar_Svg = Template.bind({})
Prop_Name_calendar_Svg.storyName = 'Prop: name: calendar'
Prop_Name_calendar_Svg.args = {
  name: 'calendar'
}

export const Prop_Name_mapMarker_Svg = Template.bind({})
Prop_Name_mapMarker_Svg.storyName = 'Prop: name: mapMarker'
Prop_Name_mapMarker_Svg.args = {
  name: 'mapMarker'
}

export const Prop_Name_arrowDown_Svg = Template.bind({})
Prop_Name_arrowDown_Svg.storyName = 'Prop: name: arrowDown'
Prop_Name_arrowDown_Svg.args = {
  name: 'arrowDown'
}

export const Prop_Name_clock_Svg = Template.bind({})
Prop_Name_clock_Svg.storyName = 'Prop: name: clock'
Prop_Name_clock_Svg.args = {
  name: 'clock'
}

export const Prop_Name_people_Svg = Template.bind({})
Prop_Name_people_Svg.storyName = 'Prop: name: people'
Prop_Name_people_Svg.args = {
  name: 'people'
}

export const Prop_Name_editcalendar_Svg = Template.bind({})
Prop_Name_editcalendar_Svg.storyName = 'Prop: name: editcalendar'
Prop_Name_editcalendar_Svg.args = {
  name: 'editcalendar'
}

export const Prop_Name_location_Svg = Template.bind({})
Prop_Name_location_Svg.storyName = 'Prop: name: location'
Prop_Name_location_Svg.args = {
  name: 'location'
}

export const Prop_Name_shutdown_Svg = Template.bind({})
Prop_Name_shutdown_Svg.storyName = 'Prop: name: shutdown'
Prop_Name_shutdown_Svg.args = {
  name: 'shutdown'
}

export const Prop_Name_account_Svg = Template.bind({})
Prop_Name_account_Svg.storyName = 'Prop: name: account'
Prop_Name_account_Svg.args = {
  name: 'account'
}

export const Prop_Name_question_Svg = Template.bind({})
Prop_Name_question_Svg.storyName = 'Prop: name: question'
Prop_Name_question_Svg.args = {
  name: 'question'
}

export const Prop_Name_menu_Svg = Template.bind({})
Prop_Name_menu_Svg.storyName = 'Prop: name: menu'
Prop_Name_menu_Svg.args = {
  name: 'menu'
}

export const Prop_Name_connect_Svg = Template.bind({})
Prop_Name_connect_Svg.storyName = 'Prop: name: connect'
Prop_Name_connect_Svg.args = {
  name: 'connect'
}
