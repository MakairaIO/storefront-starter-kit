import classNames from 'classnames'
import TeaserSimple from '../TeaserSimple'

function TeaserEnhanced(props) {
  const { data, anchorId = '' } = props
  const theme = data[0]?.theme
  const reduceTopSpace = data[0]?.reduceTopSpace
  const reduceMaxWidth = data[0]?.reduceMaxWidth

  const classes = classNames('pattern teaser-enhanced', {
    [`teaser-enhanced__theme--${theme}`]: theme,
    ['teaser-enhanced__reduce-top-space']: reduceTopSpace,
  })

  return (
    <section id={anchorId} className={classes}>
      {data.map((teaser, index) => {
        const { alignment } = teaser
        const classes = classNames('teaser-enhanced__item', {
          ['teaser-enhanced__item--left']: alignment === 'left',
          [`teaser-enhanced__item--reduce-max-width`]: reduceMaxWidth,
        })

        return (
          <div className={classes} key={index}>
            <TeaserSimple data={[teaser]} />
          </div>
        )
      })}
    </section>
  )
}

export default TeaserEnhanced
export { default as teaserEnhancedVariants } from './variants.js'
