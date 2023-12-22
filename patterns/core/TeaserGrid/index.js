import classNames from 'classnames'
import Tile from './Tile'

function TeaserGrid(props) {
  const {
    tiles = {},
    variant = 'default',
    lazyLoadingDeactivated = false,
  } = props
  const { topRight, left, middle, bottomRight } = tiles

  const classes = classNames('teaser-grid', `teaser-grid--${variant}`)

  return (
    <section className={classes}>
      <Tile
        {...topRight}
        className="teaser-grid__tile--top-right"
        lazyLoadingDeactivated={lazyLoadingDeactivated}
      />

      <Tile
        {...left}
        className="teaser-grid__tile--left"
        lazyLoadingDeactivated={lazyLoadingDeactivated}
      />

      <Tile
        {...bottomRight}
        className="teaser-grid__tile--bottom-right"
        lazyLoadingDeactivated={lazyLoadingDeactivated}
      />

      <Tile
        {...middle}
        className="teaser-grid__tile--middle"
        lazyLoadingDeactivated={lazyLoadingDeactivated}
      />
    </section>
  )
}

export default TeaserGrid
export { default as teaserGridVariants } from './variants.js'
