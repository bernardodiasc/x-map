import CardList from './CardList'

export default CardList

export const storiesConfig = {
  title: 'Custom/CardList',
  component: CardList,
  parameters: {
    controls: {
      exclude: 'Card',
    }
  },
}
