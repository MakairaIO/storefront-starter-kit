import { useRef } from 'react'
import classNames from 'classnames'
import { useLazyLoading } from '../../../utils'
import Tile from './Tile'

function TeaserGrid(props) {
  const { tiles = {}, variant = 'default' } = props
  const { topRight, left, middle, bottomRight } = tiles
  const sectionRef = useRef(null)

  const classes = classNames('teaser-grid', `teaser-grid--${variant}`)

  useLazyLoading({ ref: sectionRef, dependency: tiles })

  return (
    <section ref={sectionRef} className={classes}>
      <Tile {...topRight} className="teaser-grid__tile--top-right" />

      <Tile {...left} className="teaser-grid__tile--left" />

      <Tile {...bottomRight} className="teaser-grid__tile--bottom-right" />

      <Tile {...middle} className="teaser-grid__tile--middle" />
    </section>
  )
}

export default TeaserGrid
export { default as teaserGridVariants } from './variants.js'
