import { useRef } from 'react'
import classNames from 'classnames'
import {
  useTranslation,
  useLazyLoading,
  useConfiguration,
} from '../../../utils'
import { Heading, Copytext, Button } from '../..'

function TeaserProducts(props) {
  const listRef = useRef(null)
  const { products = [], variant = 'white' } = props

  useLazyLoading({ ref: listRef, dependency: products })

  if (products.length == 0) return null

  const classes = classNames('product-teaser', `product-teaser--${variant}`)

  return (
    <section ref={listRef} className={classes}>
      {products.map((product) => (
        <Teaser key={product.ean} {...product} />
      ))}
    </section>
  )
}

function Teaser(props) {
  const { t } = useTranslation()
  const { getImageLink } = useConfiguration()
  const { title = '', manufacturer_title = '', url = '', images = [] } = props

  const imageLink = getImageLink({
    source: images[0],
    height: 289,
    format: 'auto',
  })

  const imageLinkRetina = getImageLink({
    source: images[0],
    height: 289,
    pixelRatio: 2,
    format: 'auto',
  })

  return (
    <div className="product-teaser__teaser">
      <picture className="product-teaser__teaser-image">
        <img
          src={imageLink}
          data-srcset={`${imageLink} 1x, ${imageLinkRetina} 2x`}
          alt={title}
          height="228"
        />
      </picture>

      <p className="product-teaser__content">
        <Copytext
          weight="semi-bold"
          element="span"
          className="product-teaser__pre-title"
        >
          {manufacturer_title}
        </Copytext>

        <Heading
          weight="semi-bold"
          element="span"
          className="product-teaser__title"
        >
          {title}
        </Heading>

        <Button
          href={url}
          icon="chevron-right"
          className="product-teaser__button"
        >
          {t('PRODUCT_TILE_TO_PRODUCT')}
        </Button>
      </p>
    </div>
  )
}

export default TeaserProducts
export { default as teaserProductsVariants } from './variants.js'
