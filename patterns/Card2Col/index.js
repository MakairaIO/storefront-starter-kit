import Card from './Card'
import classNames from 'classnames'

const Card2Col = ({
  width,
  card1,
  card2,
  anchorId = '',
  theme,
  reduceTopSpace,
  reduceMaxWidth,
}) => {
  const cardsClasses = classNames('pattern card-2-col', {
    'card-2-col--same-width': width === 'sameWidth',
    'card-2-col--first-tile-smaller': width === 'firstTileSmaller',
    'card-2-col--last-tile-smaller': width === 'lastTileSmaller',
    [`card-2-col__theme--${theme}`]: theme,
    'card-2-col__reduce-top-space': reduceTopSpace,
  })

  const cardsWrapper = classNames('card-2-col__wrapper', {
    'card-2-col__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section id={anchorId} className={cardsClasses}>
      <div className={cardsWrapper}>
        <Card {...card1} />
        <Card {...card2} />
      </div>
    </section>
  )
}
export default Card2Col
export { default as card2ColVariants } from './variants.js'
