import { useRef } from 'react'
import classNames from 'classnames'
import { useLazyLoading } from '../../../utils'
import Tile from './Tile'

function TeaserGrid(props) {
  const { tiles = {}, variant = 'default', isLazyLoad = true } = props
  const { topRight, left, middle, bottomRight } = tiles
  const sectionRef = useRef(null)

  const classes = classNames('teaser-grid', `teaser-grid--${variant}`)

  useLazyLoading({ ref: sectionRef, dependency: tiles })

  return (
    <section ref={sectionRef} className={classes}>
      <Tile
        {...topRight}
        isLazyLoad={isLazyLoad}
        className="teaser-grid__tile--top-right"
      />

      <Tile
        {...left}
        isLazyLoad={isLazyLoad}
        className="teaser-grid__tile--left"
      />

      <Tile
        {...bottomRight}
        isLazyLoad={isLazyLoad}
        className="teaser-grid__tile--bottom-right"
      />

      <Tile
        {...middle}
        isLazyLoad={isLazyLoad}
        className="teaser-grid__tile--middle"
      />
    </section>
  )
}

export default TeaserGrid
export { default as teaserGridVariants } from './variants.js'
