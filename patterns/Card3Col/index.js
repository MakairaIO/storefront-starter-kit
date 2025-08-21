import Card from './Card'
import classNames from 'classnames'

const Card3Col = ({
  width,
  card1,
  card2,
  card3,
  anchorId = '',
  theme,
  reduceTopSpace,
  reduceMaxWidth,
}) => {
  const cardsClasses = classNames('pattern card-3-col', {
    'card-3-col--same-width': width === 'sameWidth',
    'card-3-col--first-tiles-smaller': width === 'firstTilesSmaller',
    'card-3-col--last-tiles-smaller': width === 'lastTilesSmaller',
    [`card-3-col__theme--${theme}`]: theme,
    'card-3-col__reduce-top-space': reduceTopSpace,
  })

  const cardsWrapper = classNames('card-3-col__wrapper', {
    'card-3-col__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section id={anchorId} className={cardsClasses}>
      <div className={cardsWrapper}>
        <Card {...card1} />
        <Card {...card2} />
        <Card {...card3} />
      </div>
    </section>
  )
}
export default Card3Col
export { default as card3ColVariants } from './variants.js'
