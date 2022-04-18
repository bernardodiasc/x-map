import Svg from './Svg'

export default Svg

export const storiesConfig = {
  title: 'Generic/Svg',
  component: Svg,
  argTypes: {
    name: {
      options: [
        'xteam',
        'map',
        'avatar',
        'marker',
        'website',
        'github',
        'stackoverflow',
        'linkedin',
        'twitter',
        'instagram',
        'x',
        'ticket',
        'calendar',
        'mapMarker',
        'arrowDown',
        'clock',
        'people',
        'editcalendar',
        'location',
        'shutdown',
        'account',
        'question',
        'menu',
        'connect',
      ],
      control: { type: 'select' },
    }
  },
}
