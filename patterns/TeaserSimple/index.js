import classNames from 'classnames'

import TeaserSimpleByLine from './TeaserSimpleByLine'
import TeaserSimpleContent from './TeaserSimpleContent'
import TeaserSimpleHeading from './TeaserSimpleHeading'

function TeaserSimple(props) {
  const { data, anchorId = '' } = props
  const theme = data?.[0]?.theme
  const reduceTopSpace = data?.[0]?.reduceTopSpace
  const alignment = data?.[0]?.alignment

  const classes = classNames('pattern teaser-simple', {
    [`teaser-simple__theme--${theme}`]: theme,
    [`teaser-simple__reduce-top-space`]: reduceTopSpace,
  })

  return (
    <section id={anchorId} className={classes}>
      {data.map((teaser) => {
        const { column, heading, meeting } = teaser
        const classes = classNames('teaser-simple__column', {
          [`teaser-simple__column--reduce-max-width`]: teaser.reduceMaxWidth,
          [`teaser-simple__alignment--${alignment}`]: alignment,
        })

        return (
          <div key={column} className={classes}>
            <div className="teaser-simple__header">
              {column && <TeaserSimpleByLine column={column} />}
              {heading && <TeaserSimpleHeading heading={heading} />}
            </div>
            <TeaserSimpleContent
              {...teaser}
              theme={theme}
              column={column}
              meeting={meeting}
            />
          </div>
        )
      })}
    </section>
  )
}

export default TeaserSimple
export { default as teaserSimpleVariants } from './variants.js'
